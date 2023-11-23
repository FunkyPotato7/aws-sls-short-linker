import * as yup from 'yup';

import { APIError } from '../errors/APIError';
import regexPatterns from '../enums/regexp.enum';
import { ILink } from '../types/links';

const linkSchema = yup.object().shape({
    link: yup.string().matches(regexPatterns.URL).required(),
    expiresIn: yup.string().optional().oneOf(['1 day', '3 days', '7 days']),
});

const linkValidator = async (body: ILink) => {
    try {
        return await linkSchema.validate(body || {});
    } catch (e: any) {
        throw new APIError(e.message, 400);
    }
};

export {
    linkValidator,
};