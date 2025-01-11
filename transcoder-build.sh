#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found"
  exit 1
fi

# Load environment variables from .env file
set -a && source .env && set +a

# Build the transcoder image
docker build -f apps/transcoder/Dockerfile -t $AWS_ECR_REPO_NAME . 

# Get the login password for ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ECR_BASE_URI

# Tag the image with the ECR URI
docker tag $AWS_ECR_REPO_NAME:latest $AWS_ECR_BASE_URI/$AWS_ECR_REPO_NAME:latest

# Push the image to ECR
docker push $AWS_ECR_BASE_URI/$AWS_ECR_REPO_NAME:latest