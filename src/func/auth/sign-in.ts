import { APIError } from '../../errors/APIError';
import { authService, userService } from '../../services';
import { authValidator } from '../../validators/auth.validator';

const signIn = async (event: any) => {
    try {
        if (!event.body) {
            throw new APIError('Body data is required', 400);
        }
        const { email, password } = await authValidator(JSON.parse(event.body));

        const { Items } = await userService.getOne(email);

        const user = Items && Items[0];

        if (!user) {
            throw new APIError('Wrong email or password', 400);
        }

        const isSame = await authService.comparePasswords(password, user.password);

        if (!isSame) {
            throw new APIError('Wrong email or password', 400);
        }

        const tokens = authService.generateAccessTokenPair({ id: user.id });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokens),
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

export const handler = signIn;