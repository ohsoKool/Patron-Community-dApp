import { Router } from 'express';
import {
    addUserToGroup,
    getAllGroupUsers,
    removeUserFromGroup,
} from '../controllers/groupUser.controller';

export const groupUserRouter = Router();

groupUserRouter.route('/add-user-to-group').post(addUserToGroup);

groupUserRouter.route('/remove-user-from-group').delete(removeUserFromGroup);

groupUserRouter.route('/get-all-groupUsers').get(getAllGroupUsers);
