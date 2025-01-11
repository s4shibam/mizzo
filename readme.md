<p align="center">
    <a href="https://mizzo.app">
        <img alt="Mizzo" width="100" src="./apps/web/src/app/icon.ico">
    </a>
</p>

<div align="center">
    <h1>Mizzo</h1>
    <p>Modern Music Streaming Platform</p>
</div>

<p align="center">
    <img src="https://img.shields.io/github/languages/code-size/s4shibam/mizzo?style=flat-square" alt="Code Size">
    <img src="https://img.shields.io/github/license/s4shibam/mizzo?style=flat-square" alt="License">
    <img src="https://img.shields.io/github/stars/s4shibam/mizzo?style=flat-square&logo=github" alt="Stars">
</p>

<br />

## ⚡ Introduction

Mizzo is a music streaming platform that allows users to discover, play, and share their favorite music. With features for both listeners and artists, Mizzo provides a comprehensive ecosystem for music enthusiasts, offering high-quality streaming, personalized playlists, and artist tools all in one place.

## ✨ Features

- **Stream Music Anywhere**: Access your favorite tracks on any device with adaptive streaming
- **Ad-Free Experience**: Premium users enjoy uninterrupted music without advertisements
- **Offline Listening**: Download tracks for offline playback (Premium feature)
- **Create & Share Playlists**: Build collections of your favorite tracks and share them with friends
- **Artist Profiles**: Follow your favorite artists and discover their latest releases
- **Artist Studio**: For musicians to upload and manage their music
- **High Quality Audio**: Premium users get enhanced audio quality
- **Personalized Recommendations**: Discover new music based on your listening habits
- **Social Sharing**: Connect your social media accounts to share what you're listening to

## 📦 Technology Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Ant Design
- **Database**: PostgreSQL, Prisma ORM
- **Caching**: Redis
- **Media Processing**: FFmpeg
- **Containerization**: Docker
- **Cloud Services**: AWS S3, Lambda
- **Development**: TurboRepo, ESLint, Prettier, Husky

## 🎯 Goals

- [x] Build a scalable music streaming platform with TypeScript end-to-end
- [x] Implement adaptive bitrate streaming for optimal audio quality on any connection
- [x] Create a fast, responsive UI with Next.js and modern React patterns
- [x] Develop an artist portal for musicians to upload and manage their content
- [x] Implement secure authentication and user profile management
- [x] Design a sophisticated playlist and library management system
- [x] Create efficient media transcoding pipeline with FFmpeg for various quality levels
- [x] Build an extensible system architecture using a monorepo approach with shared packages
- [ ] Implement AI-powered music search and recommendations

## 🏗️ Repository Structure

This monorepo contains multiple applications and shared packages, orchestrated with Turborepo for efficient builds and development workflows.

### Applications

- **[API](./apps/api/readme.md)**: Backend REST API service built with Express.js
- **[Web](./apps/web/readme.md)**: Frontend Next.js web application
- **[Cron](./apps/cron/readme.md)**: Scheduled task service for maintenance operations
- **[Transcoder](./apps/transcoder/readme.md)**: Media processing service using FFmpeg

### Packages

- **Prisma**: Database schema and client using Prisma ORM
- **AWS**: AWS SDK utilities and configurations
- **Redis**: Redis client and utilities
- **Logger**: Shared logging infrastructure
- **Utils**: Common utility functions
- **Typescript Config**: Shared TypeScript configurations
- **Eslint Config**: Shared ESLint configurations
- **Tailwind Config**: Shared Tailwind CSS configurations

## 🖼️ Screenshots

![Hero Section](https://via.placeholder.com/800x450?text=Mizzo+Hero+Section)
![Music Player](https://via.placeholder.com/800x450?text=Mizzo+Music+Player)
![Playlist View](https://via.placeholder.com/800x450?text=Mizzo+Playlist+View)

## 👋🏻 Contact

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/s4shibam)
[![Twitter](https://img.shields.io/badge/Twitter-00ACEE?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/s4shibam)
