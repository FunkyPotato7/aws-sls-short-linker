import { authService } from '../../services';
import { APIError } from '../../errors/APIError';

const authorizer = async (event: any, context: any, callback: any) => {
    try {
        const token = event.headers.authorization.split(' ')[1];
        const decoded = authService.verifyTokens(token);
        const userId = decoded && decoded['id'];
        return {
            "isAuthorized": true,
            "context": {
                'userId': userId,
            }
        };
    }
    catch (e) {
        throw new APIError('Unauthorized', 401);
    }
};

export = {
    handler: authorizer,
};