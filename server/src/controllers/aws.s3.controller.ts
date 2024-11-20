import {
    GetObjectCommand,
    S3Client,
    PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { getPreSignedUrlToUploadSchema } from '../utils/schema';
import { getPreSignedUrlFromBucketToSchema } from '../utils/schema';

const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: ACCESS_KEY_ID!,
        secretAccessKey: SECRET_ACCESS_KEY!,
    },
});

const putObject = async (fileName: string, contentType: string) => {
    const cmd = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `patron/${fileName}`,
        ContentType: contentType,
    });

    const url = await getSignedUrl(client, cmd, { expiresIn: 10 });

    return url;
};

export const getObject = async (fileName: string) => {
    const cmd = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `patron/${fileName}`,
    });

    const url = await getSignedUrl(client, cmd, { expiresIn: 10 });

    return url;
};

export const getPreSignedUrlToUpload = async (req: Request, res: Response) => {
    const { success, data } = getPreSignedUrlToUploadSchema.safeParse(
        req.query
    );

    if (!success) {
        throw new ApiError(
            400,
            'GET PRESIGNED URL : AMAZON S3 : fileName and contentType are required'
        );
    }

    const { fileName, contentType } = data;

    // const { fileName, contentType } = req.query;

    [fileName, contentType].some((value) => {
        if (!value) {
            throw new ApiError(
                400,
                'GET PRESIGNED URL : AMAZON S3 : fileName , contentType and userId are required'
            );
        }
    });

    // const user = await db.user.findUnique({
    //     where: {
    //         id: String(userId),
    //     },
    // });

    if (true) {
        try {
            const url = await putObject(fileName, contentType);

            if (url) {
                res.status(200).json(new ApiResponse(200, { url }, 'Success'));
            }
        } catch (error) {
            console.log(
                'GET PRESIGNED URL : AMAZON S3 : Failed to  assign pre-signed URL'
            );
        }
    } else {
        return res.status(404).json(new ApiResponse(404, {}, 'User not found'));
    }
};

export const getPreSignedUrlFromBucket = async (
    req: Request,
    res: Response
) => {
    // const { fileName } = req.query;
    const { success, data } = getPreSignedUrlFromBucketToSchema.safeParse(
        req.query
    );
    if (!success) {
        throw new ApiError(400, 'GET PRESIGNED URL FROM BUCKET : AMAZON S3');
    }
    const { fileName } = data;
    if (!fileName) {
        throw new ApiError(
            400,
            'GET PRESIGNED URL : AMAZON S3 : fileName is required'
        );
    }

    const url = await getObject(String(fileName));

    if (url) {
        return res.status(200).json(new ApiResponse(200, { url }, 'Success'));
    } else {
        return res.status(404).json(new ApiResponse(404, {}, 'File not found'));
    }
};
