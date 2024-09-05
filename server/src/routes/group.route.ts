import { Router } from 'express';
import {
    createGroup,
    deletedGroup,
    editGroupDescription,
    editGroupName,
    getAllGroups,
    getGroupById,
    uploadImageToCloudinary,
} from '../controllers/group.controller';

import { upload } from '../middlewares/multer.middleware';

export const groupRouter: Router = Router();

groupRouter
    .route('/upload-image')
    .post(upload.single('groupCoverImage'), uploadImageToCloudinary);

groupRouter.route('/create-group').post(createGroup);

groupRouter.route('/delete-group/:groupId').delete(deletedGroup);

groupRouter.route('/edit-groupName').patch(editGroupName);

groupRouter
    .route('/edit-groupDescription/:groupId')
    .patch(editGroupDescription);

groupRouter.route('/get-allGroup').get(getAllGroups);

groupRouter.route('/get-group').get(getGroupById);
