import { linkService } from '../../services';
import {APIError} from "../../errors/APIError";

const createLink = async (event: any, context: any, callback: any) => {
    try {
        const { body, headers, requestContext } = event;
        const { link, expiresIn } = JSON.parse(body);
        const userId = requestContext.authorizer.lambda.userId;
        const linkId = (Math.random() + 1).toString(36).substring(7);

        if (!link || !expiresIn) {
            throw new APIError('Link and expiresIn are required', 400);
        }

        await linkService.create(linkId, link, expiresIn, userId);

        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortLink: `https://${headers.host}/${linkId}` }),
        };
        callback(null, response);
    } catch (e) {
        const response = {
            statusCode: e.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(e),
        };
        callback(response, null);
    }
};

export = {
    handler: createLink,
};