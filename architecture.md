# Mizzo Platform Architecture

This document describes the backend architecture for the Mizzo music streaming platform, focusing on audio transcoding, track upload and publishing, AI-powered live lyrics generation, audio streaming, and notification system.

---

## 1. Audio Transcoding Architecture

### Flow (upload to HLS streaming)

```mermaid
flowchart TD
    A[Artist uploads audio file] --> B[Client requests presigned S3 URL]
    B --> C[API generates presigned URL]
    C --> D[Client uploads directly to S3]
    D --> E[S3 emits ObjectCreated event]
    E --> F[SQS Queue receives event]
    G[Cron Job: polls at intervals] --> H[Fetch messages in batch from SQS]
    H --> I{Capacity available?}
    I -->|Yes| J[Trigger ECS Fargate Tasks]
    I -->|No| K[Skip, retry later]
    J --> L[Transcoder Container starts]
    L --> M[Download audio from S3]
    M --> N[FFmpeg: Create HLS variants]
    N --> O[High: 128kbps, 10s segments]
    N --> P[Low: 64kbps, 10s segments]
    O --> Q[Generate master.m3u8]
    P --> Q
    Q --> R[Upload HLS files to S3]
    R --> S[Update track status: REVIEWING]
    S --> T[Notify artist]
    L -->|On error| U[Status: FAILED, notify artist]
    H --> V[Delete SQS message]
```

### Transcoding Details

#### Step 1: Presigned Upload

- Artist requests upload URL from API (`POST /utils/upload-url`)
- API generates S3 presigned URL (15 min expiry) for `raw-track/{trackId}.mp3`
- Client uploads directly to S3, bypassing API for large files

#### Step 2: Event Triggering

- S3 emits `ObjectCreated` event when upload completes
- Event sent to SQS queue for reliable processing
- Decouples upload from processing

#### Step 3: Scheduled Processing

- Cron service polls SQS at regular intervals
- Fetches messages in batch based on available capacity
- Creates ECS Fargate tasks for available capacity
- Auto-retry on failure with visibility timeout and retry limits

#### Step 4: Transcoding

- ECS spawns isolated Docker container with FFmpeg
- Downloads original audio from S3
- Creates two HLS variants:
  - _High quality_: 128kbps AAC, 10-second segments
  - _Low quality_: 64kbps AAC, 10-second segments
- Generates `master.m3u8` playlist pointing to quality variants

#### Step 5: Delivery

- Uploads all `.m3u8` playlists and `.aac` segments to S3
- Updates track status in database (`REVIEWING`)
- Container cleans up and terminates
- Artist notified via notification system

### S3 Directory Structure

```sh
s3://bucket/
├── raw-track/
│   └── {trackId}.mp3          # Original upload
└── transcoded-track/
    └── {trackId}/
        ├── master.m3u8         # Master playlist
        ├── high.m3u8          # High quality playlist
        ├── high_000.aac       # High quality segments
        ├── high_001.aac
        ├── low.m3u8           # Low quality playlist
        ├── low_000.aac        # Low quality segments
        └── low_001.aac
```

### Track Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> PENDING: Artist uploads
    PENDING --> PROCESSING: Transcoding starts
    PROCESSING --> REVIEWING: Transcoding complete
    PROCESSING --> FAILED: Error occurred
    REVIEWING --> PUBLISHED: Admin approves
    REVIEWING --> BLOCKED: Admin rejects
    PUBLISHED --> BLOCKED: Later moderation
    BLOCKED --> PUBLISHED: Admin unblocks
```

---

## 2. AI-Powered Live Lyrics System

### Flow (transcoding completion to live lyrics)

```mermaid
flowchart TD
    A[Track status: REVIEWING] --> B[Trigger Temporal workflow]
    B --> C[Temporal orchestrates tasks]
    C --> D[Worker generates presigned URL]
    D --> E[Worker calls Gemini AI]
    E --> F[AI analyzes audio + generates lyrics]
    F --> G[Store time-synced lyrics]
    G --> H[Frontend displays real-time sync]
```

### Live Lyrics Generation Details

#### Step 1: Workflow Trigger

- API detects track status change to `REVIEWING`
- Triggers Temporal workflow with track metadata
- Creates workflow record with `PENDING` status

#### Step 2: Temporal Orchestration

- Temporal Cloud manages distributed task execution
- Executes activities: audio URL generation, AI processing, database updates
- Automatic retry with exponential backoff on failure

#### Step 3: AI Processing

- Worker calls Gemini 3 Flash Preview via Vercel AI SDK
- Analyzes audio from presigned S3 URL + track metadata
- Generates time-synchronized lyrics with millisecond precision

#### Step 4: Result Storage

- Worker stores generated lyrics in database
- Updates workflow status to `COMPLETED` or `FAILED`
- Triggers notifications for completed processing

---

## 3. Track Upload and Publishing Flow

### Complete Upload Flow

```mermaid
sequenceDiagram
    participant Artist
    participant Web
    participant API
    participant S3
    participant SQS
    participant Cron
    participant ECS
    participant Admin

    Artist->>Web: Upload track + metadata
    Web->>API: POST /utils/upload-url
    API->>S3: Generate presigned URL
    API-->>Web: Presigned URL
    Web->>S3: PUT audio file
    S3-->>Web: 200 OK

    Web->>API: POST /track/upload (metadata)
    API->>API: Validate artist, profanity check
    API->>API: Create Track (status: PENDING)
    API-->>Web: Track created

    S3->>SQS: ObjectCreated event

    loop At regular intervals
        Cron->>API: Check available slots
        Cron->>SQS: Fetch messages in batch
        SQS-->>Cron: S3 events
        Cron->>ECS: Run transcoding tasks
        Cron->>SQS: Delete processed messages
    end

    ECS->>S3: Download audio
    ECS->>ECS: Transcode with FFmpeg
    ECS->>S3: Upload HLS files
    ECS->>API: Update status: REVIEWING
    API->>Artist: Notification sent

    Admin->>API: Review track
    API->>API: Update status: PUBLISHED
    API->>Artist: Track published notification
```

### Upload Process Details

#### 1. Client-Side Upload

- Artist fills form: title, language, duration, tags, lyrics, poster image
- Profanity check on all text inputs
- Request presigned URLs for both audio file and poster image
- Upload files directly to S3 (parallel uploads)

#### 2. Track Registration

```typescript
POST /track/upload
{
  id: "cuid",
  title: "Track Name",
  language: "english",
  duration: 180,
  tags: ["rock", "indie"],
  posterUrl: "s3://bucket/poster/id.jpg",
  trackUrl: "s3://bucket/raw-track/id.mp3",
  secondaryArtistIds: ["artist2", "artist3"]
}
```

#### 3. Validation

- Verify artist authentication
- Check S3 URL formats
- Validate secondary artists exist and have artist role
- Profanity detection on title, tags
- Create Track record with status `PENDING`

#### 4. Admin Review

- Admin views tracks with `REVIEWING` status
- Can update metadata (title, tags, lyrics)
- Approve → `PUBLISHED` (track goes live)
- Reject → `BLOCKED` (track hidden)
- Notifications sent to artist on status change

---

## 4. Audio Streaming

### HLS Adaptive Streaming

```mermaid
flowchart LR
    A[Client Player] --> B[Request track metadata]
    B --> C{Track PUBLISHED?}
    C -->|Yes| D[Receive HLS URL]
    C -->|No| E[403 Forbidden]
    D --> F[Load master.m3u8]
    F --> G{Detect bandwidth}
    G -->|High| H[Stream high.m3u8]
    G -->|Low| I[Stream low.m3u8]
    H --> J[Fetch AAC segments]
    I --> J
    J --> K[Adaptive playback]
    K --> L{Bandwidth changed?}
    L -->|Yes| G
    L -->|No| K
```

#### How HLS Works

1. Player requests master playlist from S3/CloudFront
2. Master playlist lists available quality variants
3. Player measures bandwidth, selects appropriate quality
4. Loads quality-specific playlist (high.m3u8 or low.m3u8)
5. Sequentially fetches audio segments (.aac files)
6. Monitors bandwidth, switches quality as needed
7. Seamless quality transitions without interruption

#### Fallback: Byte-Range Streaming

- For players without HLS support
- API endpoint: `GET /stream/{trackId}`
- Requires `Range` header (e.g., `bytes=0-1048575`)
- Returns 206 Partial Content
- Progressive loading of original MP3 file

---

## 5. Notification System

### Notification Flow

```mermaid
flowchart TD
    A[System Event] --> B{Event Type}
    B -->|Track status change| C[Track notification]
    B -->|Artist application| D[Artist notification]
    B -->|Playlist status| E[Playlist notification]

    C --> F[Create notification record]
    D --> F
    E --> F
    F --> G[Store in database]
    G --> H[User polls API]
    H --> I[Fetch unread notifications]
```

#### Notification Types

- Track: `REVIEWING`, `PUBLISHED`, `BLOCKED`
- Artist Application: `APPROVED`, `REJECTED`
- Playlist: `PUBLISHED`, `BLOCKED`, `REVIEWING`

#### Client Interaction

- `GET /notification`: Fetch unread notifications
- `PUT /notification/{id}`: Mark as read or delete
- Polling-based (upgradeable to WebSocket for real-time)

---
