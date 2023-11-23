import { SendEmailCommand } from '@aws-sdk/client-ses';
import { SESClient } from '@aws-sdk/client-ses';

import { userService } from '../../services';

const sesClient = new SESClient({ region: process.env.REGION });

const createSendEmailCommand = (fromAddress: string | undefined, toAddress: string, item: any) => {
    return new SendEmailCommand({
        Destination: {
            ToAddresses: [
                toAddress,
            ],
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `Your link ${item.linkId} has been expired`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Your link is expired`,
            },
        },
        Source: fromAddress,
    });
};

const sendEmail = async (event: any) => {
    try {
        for (const record of event.Records) {
            const { link, userId } = JSON.parse(record.body);
            const { Item } = await userService.getById(userId);

            const sendEmailCommand = createSendEmailCommand(
                process.env.SES_EMAIL,
                Item?.email,
                link,
            );

            await sesClient.send(sendEmailCommand);
        }

        return {
            statusCode: 201,
            body: "Emails sent successfully",
        };
    } catch (e) {
        return {
            statusCode: e.status,
            body: JSON.stringify(e),
        };
    }
};

export = {
   handler: sendEmail,
};
