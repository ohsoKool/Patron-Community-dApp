import { Router } from 'express';
import {
    checkIfWalletAddressExists,
    createNounce,
    getNounceByWallet,
    verifyNounce,
} from '../controllers/nounce.controller';

export const nounceRouter = Router();

nounceRouter.route('/create-nounce').get(createNounce);

nounceRouter.route('/verify-nounce').get(verifyNounce);

nounceRouter
    .route('/check-walletAddress-exists')
    .get(checkIfWalletAddressExists);

nounceRouter.route('/get-nounce').get(getNounceByWallet);
