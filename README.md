# AWS-test-task-back
This project using Node JS to perform CloudFront formation and create Lambda Functions to generate API Gateway endpoints and connect to DynamoDB and modeling DB using Dynamoose NPM package. 

# Get started

## Setup
```
yarn install
yarn global add serverless
```

## Environment
Add your environment variables in serverless.yaml

```
 environment:
    TEAM_TABLE: 'your team teable'
    USER_TABLE: 'your user teable'
    FRONT_URL: 'your front url'
    SMTP_HOST: 'your smtp host'
    SMTP_PORT: 'your smtp port'
    SMTP_USER: 'your smtp user'
    SMTP_PASS: 'your smtp pass'
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

Service Information
service: serverless-rest-api-with-dynamodb
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
  PUT - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
  DELETE - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
functions:
  serverless-rest-api-with-dynamodb-dev-update: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-update
  serverless-rest-api-with-dynamodb-dev-get: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-get
  serverless-rest-api-with-dynamodb-dev-list: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-list
  serverless-rest-api-with-dynamodb-dev-create: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-create
  serverless-rest-api-with-dynamodb-dev-delete: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-delete
```

#Local testing
You can test the lambda function locally using the command:
```
sls invoke local -f {functionName}
```

More about local testing in the documentation [OpenWhisk - Invoke Local](https://serverless.com/framework/docs/providers/openwhisk/cli-reference/invoke-local/#openwhisk---invoke-local)
