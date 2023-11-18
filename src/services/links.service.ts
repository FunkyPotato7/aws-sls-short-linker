import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

import { APIError } from '../errors/APIError';

const dynamodb = DynamoDBDocument.from(new DynamoDBClient({}));

const getOne = async (linkId: string) => {
    const command = new GetCommand({
        TableName: 'Links',
        Key: {
            linkId,
        },
    });

    return await dynamodb.send(command);
};

const create = async (linkId: string, link: string, expiresIn: string, userId: string) => {
    try {
        const command = new PutCommand({
            TableName: 'Links',
            Item: {
                linkId,
                originalLink: link.toString(),
                expiresIn,
                active: true,
                userId,
                created_at: new Date().toISOString(),
            },
        });

        await dynamodb.send(command);
    } catch (e) {
        throw new APIError(e.message, 400);
    }

};

export {
    getOne,
    create,
};