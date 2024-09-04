import { Router } from 'express';
import {
    addUserToDb,
    changeProfileImage,
    changeProfileName,
    checkIfUserExists,
    getUserIdByAddress,
    removeUserFromDb,
    retrieveUserByAddress,
} from '../controllers/user.controller';

export const userRouter: Router = Router();

userRouter.route('/add-user').post(addUserToDb);

userRouter.route('/remove-user/:userId').delete(removeUserFromDb);

userRouter.route('/retrieve-user').get(retrieveUserByAddress);

userRouter.route('/change-profileImage').put(changeProfileImage);

userRouter.route('/change-profileName').put(changeProfileName);

userRouter.route('/user-exists').get(checkIfUserExists);

userRouter.route('/get-userId').get(getUserIdByAddress);
