#!/bin/bash

echo "Starting transcoder build process..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found"
  exit 1
fi

# Load environment variables from .env file
set -a && source .env && set +a

# Validate required environment variables
required_vars=("AWS_REGION" "AWS_ECR_BASE_URI" "AWS_ECR_REPO_NAME")
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ] || [ "${!var}" == "NA" ]; then
    echo "Error: $var is undefined or set to 'NA'"
    exit 1
  fi
done


# Build the transcoder image
echo "Building Docker image..."
docker build -f apps/transcoder/Dockerfile -t $AWS_ECR_REPO_NAME . 

# Get the login password for ECR
echo "Logging in to AWS ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ECR_BASE_URI

# Tag the image with the ECR URI
echo "Tagging Docker image..."
docker tag $AWS_ECR_REPO_NAME:latest $AWS_ECR_BASE_URI/$AWS_ECR_REPO_NAME:latest

# Push the image to ECR
echo "Pushing Docker image to ECR..."
docker push $AWS_ECR_BASE_URI/$AWS_ECR_REPO_NAME:latest

echo "Docker image successfully pushed to ECR"