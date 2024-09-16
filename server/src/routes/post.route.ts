import { Router } from 'express';
import { createPost, getAllPostsInGroup } from '../controllers/post.controller';

export const postRouter = Router();

postRouter.route('/create').post(createPost);

postRouter.route('/get-groupPosts').get(getAllPostsInGroup);
