import { linkService } from '../../services';
import { linkValidator } from '../../validators/link.validator';

const createLink = async (event: any) => {
    try {
        const { body, headers, requestContext } = event;
        const { id } = requestContext.authorizer.lambda.tokenInfo;

        const linkId = (Math.random() + 1).toString(36).substring(7);

        const { link, expiresIn } = await linkValidator(JSON.parse(body));

        await linkService.create(linkId, link, expiresIn, id);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortLink: `https://${headers.host}/${linkId}` }),
        };
    } catch (e: any) {
        return {
            statusCode: e.status,
            body: JSON.stringify(e),
        };
    }
};

export const handler = createLink;
