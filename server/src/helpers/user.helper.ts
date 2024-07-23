import { ApiError } from '../utils/ApiError';
import { db } from '../utils/db';
import { GetDataMethodType } from '../utils/types';

export const getUserById = async (
    userId: string
): Promise<GetDataMethodType> => {
    if (!userId) {
        throw new ApiError(
            400,
            'GET USER BY ID : USER HELPER : Id it required to find user'
        );
    }

    const existedUser = await db.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!existedUser) {
        return {
            message: false,
        };
    }

    return {
        message: true,
    };
};

export const getUserByAddress = async (
    address: string
): Promise<GetDataMethodType> => {
    if (!address) {
        throw new ApiError(
            400,
            'GET USER BY ADDRESS : USER HELPER : Address it required to find user'
        );
    }

    const existedUser = await db.user.findUnique({
        where: {
            address,
        },
    });

    if (!existedUser) {
        return {
            message: false,
        };
    }

    return {
        message: true,
    };
};
