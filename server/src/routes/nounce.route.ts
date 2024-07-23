import { Router } from 'express';
import { getNounce, verifyNounce } from '../controllers/nounce.controller';

export const nounceRouter = Router();

nounceRouter.route('/get-nounce').get(getNounce);

nounceRouter.route('/verify-nounce').get(verifyNounce);
