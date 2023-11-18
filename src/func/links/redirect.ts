import { linkService } from '../../services';
import { APIError } from '../../errors/APIError';

const redirect = async (event: any, context: any, callback: any) => {
    try {
        const { rawPath } = event;
        const { Item } = await linkService.getOne(rawPath.slice(1));
        if (!Item || !Item.active) {
            throw new APIError('Invalid URL', 400);
        }
        const originalLink = Item && Item.originalLink;

        const response = {
            statusCode: 302,
            headers: {
                Location: originalLink,
            },
        };
        callback(null, response);
    } catch (e) {
        const response = {
            statusCode: e.status,
            body: JSON.stringify(e),
        };
        callback(response, null);
    }
};

export = {
    handler: redirect,
};