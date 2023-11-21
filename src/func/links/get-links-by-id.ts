import { linkService } from '../../services';

const getListById = async (event: any) => {
    try {
        const userId = event.requestContext.authorizer.lambda.userId;

        const result = await linkService.getOne(userId);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        };
    } catch (e) {
        return {
            statusCode: e.status,
            body: JSON.stringify(e),
        };
    }
}

export = {
    handler: getListById,
};
