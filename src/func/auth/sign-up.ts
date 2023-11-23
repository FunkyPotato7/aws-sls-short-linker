import { v4 as uuidV4 } from 'uuid';

import { APIError } from '../../errors/APIError';
import { authService, userService } from '../../services';
import { authValidator } from '../../validators/auth.validator';

const signUp = async (event: any) => {
    try {
        if (!event.body) {
            throw new APIError('Body data is required', 400);
        }
        const { email, password } = await authValidator(JSON.parse(event.body));

        const hashedPassword = await authService.hashPassword(password);

        const { Items } = await userService.getOne(email);

        if (Items?.length) {
            throw new APIError(`User with email ${email} already exist`, 400);
        }

        const id = uuidV4();
        await userService.create(id, email, hashedPassword);
        const tokens = authService.generateAccessTokenPair({ id })
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokens),
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
};

export = {
    handler: signUp,
};