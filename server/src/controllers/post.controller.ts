import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { db } from '../utils/db';
import { ApiResponse } from '../utils/ApiResponse';
import {
    createPostToSchema,
    getAllPostsInGroupToSchema,
    getAllPostsOfUserToSchema,
    getAllUnSolvedPostsInGroupToSchema,
    togglePostSolvedToSchema,
} from '../utils/schema';

export const createPost = async (req: Request, res: Response) => {
    // const { postImage, postTitle, postDescription, ownerId, groupId } =req.body;
    const { success, data } = createPostToSchema.safeParse(req.query);
    if (!success)
        throw new ApiError(
            400,
            'CREATE POST : POST CONTROLLER : POST CONTROLLER'
        );

    const { postImage, postTitle, postDescription, ownerId, groupId } = data;

    console.log('USERID: ', ownerId);

    const newPost = await db.post.create({
        data: {
            postTitle,
            postDescription,
            postImage,
            ownerId,
            groupId,
        },
    });

    if (!newPost) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to create post'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newPost, 'Successfuly created post'));
};

export const deletePost = async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(
            400,
            'DELETE POST : POST CONTROLLER : postId is required'
        );
    }

    await db.post.delete({
        where: {
            id: postId,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Successfully deleted post'));
};

export const togglePostSolved = async (req: Request, res: Response) => {
    // const { whoSolvedId, postId } = req.query;
    const { success, data } = togglePostSolvedToSchema.safeParse(req.query);
    if (!success) {
        throw new ApiError(500, 'TOGGLE POST : POST CONTROLLER');
    }
    const { whoSolvedId, postId } = data;
    if (!whoSolvedId) {
        throw new ApiError(400, 'Users id who solved is required');
    }

    const toggledPost = await db.post.update({
        where: {
            id: String(postId),
        },
        data: {
            isSolved: true,
            whoSolvedId: String(whoSolvedId),
        },
    });

    if (!toggledPost) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to toggle the post'));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                toggledPost,
                'Successfully toggled solved post'
            )
        );
};

export const getAllPostsInGroup = async (req: Request, res: Response) => {
    // const { groupId } = req.query;
    const { success, data } = getAllPostsInGroupToSchema.safeParse(req.query);
    if (!success) {
        throw new ApiError(500, 'GETALLPOSTSINGROUP : POST CONTROLLER');
    }
    const { groupId } = data;

    const skip = 0;

    if (!groupId) {
        throw new ApiError(400, 'groupId is required');
    }

    const allPostsInGroup = await db.post.findMany({
        where: {
            groupId: String(groupId),
        },
        select: {
            postImage: true,
            postDescription: true,
            postTitle: true,
            createdAt: true,
            onwner: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
        skip,
        take: Number(10),
    });

    if (!allPostsInGroup) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    'Failed to retriev all posts in a group'
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allPostsInGroup,
                'Successfully retrieved all posts in group'
            )
        );
};

export const getAllPostsOfUser = async (req: Request, res: Response) => {
    // const { limit, pageNo, userId } = req.query;
    const { success, data } = getAllPostsOfUserToSchema.safeParse(req.query);
    if (!success)
        throw new ApiError(500, 'GETALLPOSTSOFFUSER : POST CONTROLLER');
    const { limit, pageNo, userId } = data;

    const skip = (Number(pageNo) - 1) * Number(limit);

    if (!userId) {
        throw new ApiError(400, 'userId is required');
    }

    const allPostsOfUser = await db.post.findMany({
        where: {
            ownerId: String(userId),
        },
        skip,
        take: Number(limit),
    });

    if (!allPostsOfUser) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    'Failed to retriev all posts in a group'
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allPostsOfUser,
                'Successfully retrieved all posts in group'
            )
        );
};

export const getAllUnSolvedPostsInGroup = async (
    req: Request,
    res: Response
) => {
    // const { limit, pageNo, groupId } = req.query;
    const { success, data } = getAllUnSolvedPostsInGroupToSchema.safeParse(
        req.query
    );
    if (!success) {
        throw new ApiError(500, 'GETALLUNSOLVEDPOSTSINGROUP : POST CONTROLLER');
    }
    const { limit, pageNo, groupId } = data;

    const skip = (Number(pageNo) - 1) * Number(limit);

    if (!groupId) {
        throw new ApiError(400, 'groupId is required');
    }

    const allUnSolvedPostsInGroup = await db.post.findMany({
        where: {
            groupId: String(groupId),
            isSolved: false,
        },
        skip,
        take: Number(limit),
    });

    if (!allUnSolvedPostsInGroup) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    'Failed to retriev all posts in a group which are unsolved'
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allUnSolvedPostsInGroup,
                'Successfully retrieved all posts in group which are solved'
            )
        );
};
