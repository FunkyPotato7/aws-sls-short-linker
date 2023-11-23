import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, ScanCommand, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { APIError } from '../errors/APIError';

const dynamodb = DynamoDBDocument.from(new DynamoDBClient({}));

const getAll = async () => {
    const command = new ScanCommand({
        TableName: process.env.TABLE_NAME_LINKS,
    });

    return await dynamodb.send(command);
};

const getOne = async (userId: string) => {
    const command = new ScanCommand({
        TableName: process.env.TABLE_NAME_LINKS,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId },
    });

    return await dynamodb.send(command);
};

const getById = async (linkId: string) => {
    const command = new GetCommand({
        TableName: process.env.TABLE_NAME_LINKS,
        Key: {
            linkId,
        },
    });

    return await dynamodb.send(command);
};

const create = async (linkId: string, link: string, expiresIn: string | undefined = '', userId: string) => {
    try {
        const command = new PutCommand({
            TableName: process.env.TABLE_NAME_LINKS,
            Item: {
                linkId,
                originalLink: link.toString(),
                expiresIn,
                active: true,
                userId,
                createdAt: new Date().toISOString(),
                visits: 0
            },
        });

        await dynamodb.send(command);
    } catch (e) {
        throw new APIError(e.message, e.$metadata.httpStatusCode);
    }

};

const update = async (linkId: string, fieldToUpdate: string, value: string | boolean | number) => {
    try {
        const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME_LINKS,
            Key: {
                linkId,
            },
            UpdateExpression: `set ${fieldToUpdate} = :value`,
            ConditionExpression: 'attribute_exists(linkId) AND active = :active',
            ExpressionAttributeValues: {
                ':value': value,
                ':active': true
            },
            ReturnValues: 'ALL_NEW',
        });
        return await dynamodb.send(command);
    } catch (e) {
        throw new APIError(`Link with id: '${linkId}' is not exist`, 404);
    }
};

export {
    getAll,
    getById,
    getOne,
    create,
    update,
};