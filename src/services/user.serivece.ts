import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

import { APIError } from '../errors/APIError';

const dynamodb = DynamoDBDocument.from(new DynamoDB());

const getById = async (id: string) => {
    try {
        const command = new GetCommand({
            TableName: process.env.TABLE_NAME_USERS,
            Key: {
                id,
            },
        });
        return await dynamodb.send(command);
    } catch (e) {
        throw new APIError(e.message, e.$metadata.httpStatusCode);
    }
};

const getOne = async (email: string) => {
    try {
        const command = new ScanCommand({
            TableName: process.env.TABLE_NAME_USERS,
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
            TableName: process.env.TABLE_NAME_USERS,
            Item: {
                id,
                email,
                password,
                createdAt: new Date().toISOString(),
            }
        });

        await dynamodb.send(command);
    } catch (e) {
        throw new APIError(e.message, e.$metadata.httpStatusCode);
    }
};

export {
    getById,
    getOne,
    create,
};