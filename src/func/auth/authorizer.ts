import { authService } from '../../services';
import { APIError } from '../../errors/APIError';

const authorizer = async (event: any) => {
    try {
        const token = event.headers.authorization.split(' ')[1];
        const decoded = authService.verifyTokens(token);
        return {
            "isAuthorized": true,
            "context": {
                'userId': decoded['id'],
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