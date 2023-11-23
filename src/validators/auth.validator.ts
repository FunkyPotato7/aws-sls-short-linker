import * as yup from 'yup';

import { APIError } from '../errors/APIError';
import regexPatterns from '../enums/regexp.enum';
import { ICredentials } from '../types/auth';

const authSchema = yup.object().shape({
    email: yup.string().matches(regexPatterns.EMAIL).lowercase().trim().required(),
    password: yup.string().required()
});

const authValidator = async (body: ICredentials) => {
    try {
        return await authSchema.validate(body || {});
    } catch (e: any) {
        throw new APIError(e.message, 400);
    }
};

export {
    authValidator,
};