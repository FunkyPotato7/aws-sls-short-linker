import * as yup from 'yup';

import { APIError } from '../errors/APIError';
import regexPatterns = require('../enums/regexp.enum');

const authSchema = yup.object().shape({
    email: yup.string().matches(regexPatterns.EMAIL).required(),
    password: yup.string().required()
});

const authValidator = async (body: any) => {
    try {
        return await authSchema.validate(body || {});
    } catch (e) {
        throw new APIError(e.message, 400);
    }
};

export {
    authValidator,
};