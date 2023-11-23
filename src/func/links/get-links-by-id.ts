import { linkService } from '../../services';

const getListById = async (event: any) => {
    try {
        const { id } = event.requestContext.authorizer.lambda.tokenInfo;
        const { Count, Items } = await linkService.getOne(id);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Count, Items}),
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

export const handler = getListById;
