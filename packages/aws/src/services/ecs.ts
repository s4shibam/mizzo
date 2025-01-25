import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs'

import { API_URL } from '@mizzo/utils'

import { S3_DIRECTORIES } from '../utils/constants'
import { env } from '../utils/env'

const ecsClient = new ECSClient({
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey
  }
})

type TEcsRunTaskParams = {
  bucketName: string
  key: string
}

export const ecsRunTask = async ({ bucketName, key }: TEcsRunTaskParams) => {
  const command = new RunTaskCommand({
    taskDefinition: env.awsEcsTaskDefinitionArn,
    cluster: env.awsEcsClusterArn,
    launchType: 'FARGATE',
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: 'ENABLED',
        securityGroups: [env.awsEcsSecurityGroup],
        subnets: [...env.awsEcsSubnets]
      }
    },
    overrides: {
      containerOverrides: [
        {
          name: 'mizzo-transcoder',
          environment: [
            { name: 'AWS_S3_BUCKET', value: bucketName },
            { name: 'AWS_S3_TRACK_KEY', value: key },
            { name: 'AWS_ACCESS_KEY_ID', value: env.awsAccessKeyId },
            { name: 'AWS_SECRET_ACCESS_KEY', value: env.awsSecretAccessKey },
            { name: 'AWS_REGION', value: env.awsRegion },
            {
              name: 'AWS_S3_TRANSCODED_TRACK_DIR',
              value: S3_DIRECTORIES['transcoded-track']
            },
            { name: 'NEXT_PUBLIC_API_URL', value: API_URL },
            {
              name: 'API_SECRET_KEY',
              value: env.apiSecretKey
            }
          ]
        }
      ]
    }
  })

  const response = await ecsClient.send(command)
  return response
}
