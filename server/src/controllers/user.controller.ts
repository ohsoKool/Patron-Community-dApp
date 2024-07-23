import { Request, Response } from 'express';
import { AddUserToDbType, GetDataMethodType } from '../utils/types';
import { ApiError } from '../utils/ApiError';
import { db } from '../utils/db';
import { getUserByAddress, getUserById } from '../helpers/user.helper';
import { ApiResponse } from '../utils/ApiResponse';

export const addUserToDb = async (req: Request, res: Response) => {
    const { name, address }: AddUserToDbType = req.body;

    if (!address) {
        throw new ApiError(
            400,
            'ADD USER TO DB : USER CONTROLLER : Address is required'
        );
    }

    const { message }: GetDataMethodType = await getUserByAddress(address);

    if (message == true) {
        throw new ApiError(
            400,
            'ADD USER TO DB : USER CONTROLLER : User already exists'
        );
    } else {
        const newUser = await db.user.create({
            data: {
                address,
                name,
                createdAt: new Date(),
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newUser,
                    'User is successfully created and added to database'
                )
            );
    }
};

export const removeUserFromDb = async (req: Request, res: Response) => {
    console.log('REQ PARAMS: ', req.params);
    const userId = req.params.userId;

    if (!userId) {
        throw new ApiError(
            400,
            'REMOVE USER FROM DB : USER CONTROLLER : userId is required '
        );
    }

    const { message }: GetDataMethodType = await getUserById(userId);

    if (message == true) {
        await db.user.delete({
            where: {
                id: userId,
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    'User deleted from database successfully'
                )
            );
    } else {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    'User with provided address doesnot exist'
                )
            );
    }
};
