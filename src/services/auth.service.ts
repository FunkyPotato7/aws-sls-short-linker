import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { APIError } from '../errors/APIError';

const hashPassword = (password: string) => bcrypt.hash(password, 10);

const comparePasswords = async (password: string, hashPassword: string) => {
    if (!password || !hashPassword) {
        throw new APIError('Password is not provided', 400);
    }

    return await bcrypt.compare(password, hashPassword);
};

const generateAccessTokenPair = (dataToSign = {}) => {
    try {
        const access_token = jwt.sign(dataToSign, 'secret', { expiresIn: '60m' });
        const refresh_token = jwt.sign(dataToSign, 'refresh', { expiresIn: '60m' });

        return {
            access_token,
            refresh_token,
        };
    } catch (e) {
        throw new APIError('Internal Server Error', 500);
    }
};

const verifyTokens = (token: string, tokenType = 'access') => {
    try {
        let key = '';

        if (tokenType === 'access') key = 'secret';
        else if (tokenType === 'refresh') key = 'refresh';

        return jwt.verify(token, key);
    } catch (e) {
        throw new APIError('Unauthorized', 401);
    }
};

export {
    hashPassword,
    comparePasswords,
    generateAccessTokenPair,
    verifyTokens,
};