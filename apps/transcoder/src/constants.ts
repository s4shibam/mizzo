export const VALID_EXT_NAMES = ['mp3', 'wav', 'm4a']

export const TRANSCODING_OPTIONS = [
  { quality: 'high', bitrate: 128, duration: 15 },
  { quality: 'low', bitrate: 64, duration: 10 }
]

export const MASTER_PLAYLIST_NAME = 'master.m3u8'

export const MASTER_PLAYLIST_CONTENT = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=320000,CODECS="mp4a.40.2"
high.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=96000,CODECS="mp4a.40.2"
low.m3u8`
