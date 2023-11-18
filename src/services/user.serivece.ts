import { DynamoDB } from '@aws-sdk/client-dynamodb';
import {DynamoDBDocument, PutCommand, ScanCommand} from '@aws-sdk/lib-dynamodb';

import { APIError } from '../errors/APIError';

const dynamodb = DynamoDBDocument.from(new DynamoDB());

const getOne = async (email: string) => {
    try {
        const command = new ScanCommand({
            TableName: 'Users',
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: { ':email': email },
        });

        return await dynamodb.send(command);
    } catch (e) {
        throw new APIError(e.message, e.$metadata.httpStatusCode);
    }
};

const create = async (id: string, email: string, password: string) => {
    try {
        const command = new PutCommand({
            TableName: 'Users',
            Item: {
                id,
                email,
                password,
                created_at: new Date().toISOString(),
            }
        });

        await dynamodb.send(command);
    } catch (e) {
        throw new APIError(e.message, e.$metadata.httpStatusCode);
    }
};

export {
    getOne,
    create,
};