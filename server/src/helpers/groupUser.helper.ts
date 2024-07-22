import { db } from '../utils/db';
import { GetDataMethodType } from '../utils/types';

export const getUserInGroup = async (
    userId: string,
    groupId: string
): Promise<GetDataMethodType> => {
    const groupUser = await db.groupUser.findUnique({
        where: {
            groupId,
            userId,
        },
    });

    if (!groupUser) {
        return {
            message: false,
        };
    } else {
        return {
            message: true,
        };
    }
};
