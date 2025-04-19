# Mizzo Transcoder

## ⚡ Introduction

Mizzo Transcoder is a microservice that converts audio files (mp3, wav, m4a) into HLS (HTTP Live Streaming) format with multiple bitrate variants. It creates audio segments and playlist files for adaptive streaming.

## ✨ Features

- Audio transcoding using FFmpeg
- Adaptive bitrate streaming (HLS) generation
- AWS S3 integration for media storage
- FFmpeg (via fluent-ffmpeg)
- Containerized with Docker for scalable deployment

## ⚙️ Tech Stack

- Node.js
- TypeScript
- FFmpeg
- Docker
- AWS S3, ECR, ECS Fargate
