import { Router } from 'express';
import { addUserToDb, removeUserFromDb } from '../controllers/user.controller';

export const userRouter: Router = Router();

userRouter.route('/add-user').post(addUserToDb);

userRouter.route('/remove-user/:userId').delete(removeUserFromDb);
