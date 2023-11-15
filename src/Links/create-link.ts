import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = DynamoDBDocument.from(new DynamoDB())

const createLink = async (event: any) => {
    const { link, expiresIn } = JSON.parse(event.body);
    const linkId = (Math.random() + 1).toString(36).substring(7);

    const command = new PutCommand({
        TableName: 'Links',
        Item: {
            linkId: linkId,
            originalLink: link.toString(),
            expiresIn,
            active: true,
            userId: "someId",
            created_at: new Date().toISOString(),
        },
    });

    try {
        await dynamodb.send(command);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortLink: `http://localhost:3000/${linkId}` }),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Error creating item' }),
        };
    }
};

export = {
    handler: createLink,
};