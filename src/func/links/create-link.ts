import { linkService } from '../../services';
import { linkValidator } from '../../validator/link.validator';

const createLink = async (event: any) => {
    try {
        const { body, headers, requestContext } = event;
        const userId = requestContext.authorizer.lambda.userId;
        const linkId = (Math.random() + 1).toString(36).substring(7);

        const { link, expiresIn } = await linkValidator(JSON.parse(body));

        await linkService.create(linkId, link, expiresIn, userId);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortLink: `https://${headers.host}/${linkId}` }),
        };
    } catch (e) {
        return {
            statusCode: e.status,
            body: JSON.stringify(e),
        };
    }
};

export = {
    handler: createLink,
};