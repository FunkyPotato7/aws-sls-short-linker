import { linkService } from '../../services';
import { APIError } from '../../errors/APIError';

const redirect = async (event: any) => {
    try {
        const { rawPath } = event;
        const { Item } = await linkService.getById(rawPath.slice(1));
        if (!Item || !Item.active) {
            throw new APIError('Invalid URL', 400);
        }

        await linkService.update(Item.linkId, 'visits', Item?.visits + 1);

        if (!Item.expiresIn) {
            await linkService.update(Item.linkId, 'active', false);
        }

        const originalLink = Item.originalLink;

        return {
            statusCode: 302,
            headers: {
                Location: originalLink,
            },
        };
    } catch (e) {
        return {
            statusCode: e.status,
            body: JSON.stringify(e),
        };
    }
};

export = {
    handler: redirect,
};