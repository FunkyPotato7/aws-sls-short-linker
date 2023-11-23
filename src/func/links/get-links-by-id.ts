import { linkService } from '../../services';

const getListById = async (event: any) => {
    try {
        //const userId = event.requestContext.authorizer.lambda.userId;
        const userId = 'ce88def0-ee27-4324-bd07-8944aaf6828a'

        const { Count, Items } = await linkService.getOne(userId);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Count, Items}),
        };
    } catch (e) {
        return {
            statusCode: e.status,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(e),
        };
    }
}

export = {
    handler: getListById,
};
