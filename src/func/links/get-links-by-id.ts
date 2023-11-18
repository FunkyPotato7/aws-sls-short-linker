import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = DynamoDBDocument.from(new DynamoDBClient({}));

const getListById = async (event: any, context: any, callback: any) => {
    try {
        const userId = event.requestContext.authorizer.lambda.userId;

        const command = new ScanCommand({
            TableName: 'Links',
            FilterExpression: 'userId = :userId',
            ExpressionAttributeValues: { ':userId': userId },
        });

        const result = await dynamodb.send(command);
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        };
        callback(null, response);
    } catch (e) {
        const response = {
            statusCode: e.status,
            body: JSON.stringify(e),
        };
        callback(response, null);
    }
}

export = {
    handler: getListById,
};
