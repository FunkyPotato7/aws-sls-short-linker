import { APIError } from '../../errors/APIError';
import { linkService, sqsService } from '../../services';

const deactivateLinkById = async (event: any) => {
    try {
        const { body } = event;
        if (!body) {
            throw new APIError("Body data is required", 400);
        }

        const { linkId } = JSON.parse(body);
        if (!linkId) {
            throw new APIError("Field 'linkId' is required", 400);
        }

        const { Attributes } = await linkService.update(linkId, 'active', false);

        await sqsService.sendMessage({ link: Attributes, userId: Attributes?.userId });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Attributes),
        };
    } catch (e: any) {
        return {
            statusCode: e.status,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(e),
        };
    }
};

export const handler = deactivateLinkById;
