import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { getUserInGroup } from '../helpers/groupUser.helper';
import { ApiResponse } from '../utils/ApiResponse';
import { db } from '../utils/db';
import {
    addUserToGroupToSchema,
    getAllGroupUsersToSchema,
    getUserJoinedDateToSchema,
    removeUserFromGroupToSchema,
} from '../utils/schema';

export const addUserToGroup = async (req: Request, res: Response) => {
    // const { groupId, walletAddress } = req.query;
    const { success, data } = addUserToGroupToSchema.safeParse(req.query);
    if (!success) {
        throw new ApiError(500, 'ADDUSERTOGROUP : GROUPUSER CONTROLLER');
    }
    const { groupId, walletAddress } = data;

    const user = await db.user.findFirst({
        where: {
            address: String(walletAddress),
        },
        select: {
            id: true,
        },
    });

    const { message } = await getUserInGroup(String(user?.id), String(groupId));

    console.log('MESSAGE: ', message);

    if (message == true) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    433,
                    {},
                    'User provided already exists in the provided group'
                )
            );
    }

    // const addedUser = await db.groupUser.create({
    //     data: {
    //         groupId: String(groupId),
    //         userId: String(user?.id),
    //     },
    // });

    const addedUser = await db.groupUser.create({
        data: {
            groupId: String(groupId),
            userId: String(user?.id),
        },
    });

    if (!addedUser) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to add user to the group'));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                addedUser,
                'User successfully added to the group'
            )
        );
};

export const removeUserFromGroup = async (req: Request, res: Response) => {
    // const { groupId, userId } = req.query;
    const { success, data } = removeUserFromGroupToSchema.safeParse(req.query);
    if (!success) {
        throw new ApiError(500, 'ADDUSERTOGROUP : GROUPUSER CONTROLLER');
    }
    const { groupId, userId } = data;

    const alreadyExistInGroup = await getUserInGroup(
        String(userId),
        String(groupId)
    );

    if (!alreadyExistInGroup) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, 'User doesnot belong to the group'));
    }

    await db.groupUser.delete({
        where: {
            groupId: String(groupId),
            userId: String(userId),
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, 'User successfully removed from the group')
        );
};

export const getAllGroupUsers = async (req: Request, res: Response) => {
    // const { limit, pageNo, groupId } = req.query;
    const { success, data } = getAllGroupUsersToSchema.safeParse(req.query);
    if (!success) {
        throw new ApiError(500, 'ADDUSERTOGROUP : GROUPUSER CONTROLLER');
    }
    const { limit, pageNo, groupId } = data;

    const skip = (Number(pageNo) - 1) * Number(limit);

    const allGroupUsers = await db.groupUser.findMany({
        where: {
            groupId: String(groupId),
        },
        skip,
        take: Number(limit),
    });

    if (!allGroupUsers) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    'Failed to retrieve all user from a group'
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allGroupUsers,
                'Successfully retrieved all the users from the group'
            )
        );
};

export const getUserJoinedDate = async (req: Request, res: Response) => {
    // const { userId, groupId } = req.query;
    const { success, data } = getUserJoinedDateToSchema.safeParse(req.query);
    if (!success) {
        throw new ApiError(500, 'ADDUSERTOGROUP : GROUPUSER CONTROLLER');
    }
    const { userId, groupId } = data;

    if (!userId) {
        throw new ApiError(
            400,
            'GET USER JOINED DATE : GROUP USER CONTROLLER : User ID is required'
        );
    }

    const user = await db.groupUser.findFirst({
        where: {
            userId: String(userId),
            groupId: String(groupId),
        },
        select: {
            createdAt: true,
        },
    });

    if (!user) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    {},
                    'User does not exist in the provided group or does not exist at all'
                )
            );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user.createdAt ? user.createdAt : '',
                    'User joined the group on this date'
                )
            );
    }
};
