import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { getUserInGroup } from '../helpers/groupUser.helper';
import { ApiResponse } from '../utils/ApiResponse';
import { db } from '../utils/db';

export const addUserToGroup = async (req: Request, res: Response) => {
    const { groupId, userId } = req.query;

    [groupId, userId].some((each) => {
        if (!each) {
            throw new ApiError(
                400,
                'ADD USER TO GROUP : GROUP USER CONTROLLER : All fields are required'
            );
        }
    });

    const { message } = await getUserInGroup(String(userId), String(groupId));

    if (message == true) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    'User provided already exists in the provided group'
                )
            );
    }

    const addedUser = await db.groupUser.create({
        data: {
            groupId: String(groupId),
            userId: String(userId),
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
    const { groupId, userId } = req.query;

    [groupId, userId].some((each) => {
        if (!each) {
            throw new ApiError(
                400,
                'ADD USER TO GROUP : GROUP USER CONTROLLER : All fields are required'
            );
        }
    });

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
    const { limit, pageNo, groupId } = req.query;

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
