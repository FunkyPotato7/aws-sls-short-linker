import { linkService, sqsService } from '../../services';

const deactivateLinks = async () => {
    try {
        console.log('Cron started...');
        const { Items } = await linkService.getAll();

        Items?.map(async link => {
            if (link.active) {
                const createdAtDate = new Date(link.createdAt);
                const currentDate = new Date();
                const expiryDate = new Date(createdAtDate);
                expiryDate.setDate(expiryDate.getDate() + parseInt(link.expiresIn[0]));

                const isExpired = currentDate > expiryDate;

                if (isExpired) {
                    console.log(`Link ${link.linkId} is expired, deactivating`);
                    await linkService.update(link.linkId, 'active', false);
                    await sqsService.sendMessage({ link, userId: link.userId });
                } else {
                    console.log(`Link ${link.linkId} is active`);
                }
            }
        });

        console.log('Cron ended its job');
        return {
            success: true,
        };
    } catch (e) {
        return {
            statusCode: e.status || e.statusCode,
            body: JSON.stringify(e),
        };
    }
};

export = {
    handler: deactivateLinks,
};