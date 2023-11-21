import * as yup from 'yup';

import { APIError } from '../errors/APIError';
import regexPatterns = require('../enums/regexp.enum');

const linkSchema = yup.object().shape({
    link: yup.string().matches(regexPatterns.URL).required(),
    expiresIn: yup.string().optional().oneOf(['1 day', '3 days', '7, days']),
});

const linkValidator = async (body: any) => {
    try {
        return await linkSchema.validate(body || {});
    } catch (e) {
        throw new APIError(e.message, 400);
    }
};

export {
    linkValidator,
};