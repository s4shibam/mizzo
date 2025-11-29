# Mizzo API

## ⚡ Introduction

Mizzo API is the backend service that provides core functionality for the music platform. It handles data access, authentication, and business logic through a RESTful interface.

## ✨ Features

- RESTful API endpoints with Express.js and TypeScript
- JWT-based authentication system
- Integration with AWS services
- Database operations via Prisma ORM
- Containerized PostgreSQL and Redis for storage and caching
- Request validation with Zod
- User, artist, and admin role management
- Track and Playlist CRUD operations
- Logging with Winston and Grafana Loki
- Byte range audio streaming on HLS failure
- Rate limiting to protect against abuse and DOS attacks

## ⚙️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis
- AWS (Lambda, S3, SQS, ECS, SES)

### 📦 Other Libraries and Tools

- Serverless Framework
- Zod
- JWT
- Grafana Loki
- Docker
