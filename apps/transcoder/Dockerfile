# Build stage
FROM node:20-alpine AS builder

# Set working directory for the monorepo
WORKDIR /app

# Copy only the necessary files for package installation and building
COPY package.json turbo.json ./
COPY packages/aws/package.json ./packages/aws/
COPY packages/utils/package.json ./packages/utils/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

COPY apps/transcoder/package.json ./apps/transcoder/

# Install dependencies without running monorepo postinstall hooks
RUN npm install --frozen-lockfile --ignore-scripts

# Copy source files of the packages required by transcoder and the app itself
COPY packages/aws ./packages/aws/
COPY packages/utils ./packages/utils/
COPY packages/eslint-config ./packages/eslint-config/
COPY packages/typescript-config ./packages/typescript-config/
COPY apps/transcoder ./apps/transcoder/

# Build only the transcoder app and its dependencies
RUN npx turbo run build --filter=transcoder...

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Install FFmpeg
RUN apk add --no-cache ffmpeg

# Create node_modules with only monorepo packages
RUN mkdir -p node_modules/@mizzo

COPY --from=builder /app/packages/aws/package.json ./node_modules/@mizzo/aws/
COPY --from=builder /app/packages/utils/package.json ./node_modules/@mizzo/utils/
COPY --from=builder /app/packages/eslint-config ./node_modules/@mizzo/eslint-config
COPY --from=builder /app/packages/typescript-config ./node_modules/@mizzo/typescript-config

COPY --from=builder /app/packages/aws/.dist ./node_modules/@mizzo/aws/.dist
COPY --from=builder /app/packages/utils/.dist ./node_modules/@mizzo/utils/.dist

# Copy transcoder built app and package.json
COPY --from=builder /app/apps/transcoder/.dist ./.dist
COPY --from=builder /app/apps/transcoder/package.json ./

# Install only production dependencies
RUN npm install --omit=dev --ignore-scripts --no-package-lock

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", ".dist/src/index.js"]