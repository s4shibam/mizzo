type TEnv = {
  apiSecretKey: string | 'NA'
  awsRegion: string | 'NA'
  awsAccessKeyId: string | 'NA'
  awsSecretAccessKey: string | 'NA'
  awsS3Bucket: string | 'NA'
  awsSqsQueueUrl: string | 'NA'
  awsEcsTaskDefinitionArn: string | 'NA'
  awsEcsClusterArn: string | 'NA'
  awsEcsSubnets: string[]
  awsEcsSecurityGroup: string | 'NA'
  awsSesSenderEmail: string | 'NA'
}

// Note: "APP_" prefix is for lambda functions only
export const env: TEnv = {
  apiSecretKey: process.env.API_SECRET_KEY || 'NA',
  awsRegion: process.env.APP_AWS_REGION || process.env.AWS_REGION || 'NA',
  awsAccessKeyId:
    process.env.APP_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || 'NA',
  awsSecretAccessKey:
    process.env.APP_AWS_SECRET_ACCESS_KEY ||
    process.env.AWS_SECRET_ACCESS_KEY ||
    'NA',
  awsS3Bucket: process.env.AWS_S3_BUCKET || 'NA',
  awsSqsQueueUrl: process.env.AWS_SQS_QUEUE_URL || 'NA',
  awsEcsTaskDefinitionArn: process.env.AWS_ECS_TASK_DEFINITION_ARN || 'NA',
  awsEcsClusterArn: process.env.AWS_ECS_CLUSTER_ARN || 'NA',
  awsEcsSubnets: getAwsEcsSubnets(),
  awsEcsSecurityGroup: process.env.AWS_ECS_SECURITY_GROUP || 'NA',
  awsSesSenderEmail: process.env.AWS_SES_SENDER_EMAIL || 'NA'
}

function getAwsEcsSubnets(): string[] {
  return (process.env.AWS_ECS_SUBNETS?.replace(/\s/g, '')?.split(',') ||
    []) as string[]
}
