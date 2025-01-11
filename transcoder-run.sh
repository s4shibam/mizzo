#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found"
  exit 1
fi

# Remove existing container if it exists
docker rm -f mizzo-transcoder 2>/dev/null || true

# Run the container
docker run \
  --env-file .env \
  --name mizzo-transcoder \
  mizzo-transcoder:latest