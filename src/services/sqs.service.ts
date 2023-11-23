import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';

import { APIError } from '../errors/APIError';

const client = new SQSClient({});
const sqsQueueUrl = `https://sqs.${process.env.REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.SQS_QUEUE_NAME}`;

const sendMessage = async (data = {}) => {
    try {
        const command = new SendMessageCommand({
            QueueUrl: sqsQueueUrl,
            DelaySeconds: 10,
            MessageBody: JSON.stringify(data),
        });

        await client.send(command);
    } catch (e: any) {
        throw new APIError(e.message, e.$metadata.httpStatusCode);
    }
};

export {
    sendMessage,
};