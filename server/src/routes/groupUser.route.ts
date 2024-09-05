import { Router } from 'express';
import {
    addUserToGroup,
    getAllGroupUsers,
    getUserJoinedDate,
    removeUserFromGroup,
} from '../controllers/groupUser.controller';

export const groupUserRouter = Router();

groupUserRouter.route('/add-user-to-group').post(addUserToGroup);

groupUserRouter.route('/remove-user-from-group').delete(removeUserFromGroup);

groupUserRouter.route('/get-all-groupUsers').get(getAllGroupUsers);

groupUserRouter.route('/get-joinedDate').get(getUserJoinedDate);
