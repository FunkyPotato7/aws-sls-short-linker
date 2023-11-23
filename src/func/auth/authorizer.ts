import { authService } from '../../services';
import { APIError } from '../../errors/APIError';

const authorizer = async (event: any) => {
    try {
        const token = event.headers.authorization.split(' ')[1];
        const tokenInfo = authService.verifyTokens(token);
        return {
            "isAuthorized": true,
            "context": {
                'tokenInfo': tokenInfo,
            }
        };
    }
    catch (e: any) {
        throw new APIError('Unauthorized', 401);
    }
};


export const handler = authorizer;