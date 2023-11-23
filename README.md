# Serverless shortLinker API

This API was created to make your long-long links shorter.

## Usage

Firstly, to deploy this project, you need to have your `env` file with the correct variables in `environments` folder. Check `.env.exapmle`
to see what variables do you need.

### Deployment

Run this script:

```
npm run deploy:prod
```

_Note_: the option `prod` is the stage of project. Depending on which env file you have prod.env or local.env you need to
provide right option. Example: `local.env => deploy:local`.

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

### Local development

You can also run this project locally by using the following command:

```bash
npm run start:prod
```
After successful start, you should see output:

```bash
   │   POST | http://localhost:3000/2015-03-31/functions/getById/invocations              │
   │   GET  | http://localhost:3000/{linkId}                                              │
   │   POST | http://localhost:3000/2015-03-31/functions/redirect/invocations             │
   │   POST | http://localhost:3000/deactivate                                            │
   │   POST | http://localhost:3000/2015-03-31/functions/deactivateLinkById/invocations   │
   │                                                                                      │
   └──────────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀
```
**WARNING**: When you run project locally, lambda authorizer will not work, but for some endpoints you need user id,
which you get form authorizer. So you need to hardcode user id for proper work of project.

### Invocation

After successful deployment, you can call the created application.

You have 6 endpoint to work with:

* /signUp - creating new user
* /signIn - login in to your account
* /createLink - create new short link
* /getById - get all links of user
* /deactivate - deactivate link by id
* /{linkId} - redirect to your source

## Project structure

├── environments/

├── src/

│ │ └── enums/

│ │ └── errors/

│ ├── func/

│ │ └── auth/

│ │ └── email/

│ │ └── links/

│ ├── services/

│ └── types/

│ └── validators/

└──

├── swagger/

* environments - a directory with env files
* src - main directory
    * enums - directory with enums files    
    * errors - directory with custom errors  
    * func - directory with all lambda functions
      * auth - all lambda functions related with authorization
      * email - directory with lambda function for email service
      * links - all lambda functions related with links
    * services - directory with all service functions (dynamodb requests, sqs client)
    * type - directory with type interfaces
    * validators - directory with validators for incoming body
* swagger - swagger directory, with required files for documentation

For better understanding how make requests, go to this endpoint and read docs:
https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/swagger
