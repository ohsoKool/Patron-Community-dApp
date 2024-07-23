import { db } from '../utils/db';

export const getNounceByWalletAddress = async (walletAddress: string) => {
    try {
        const response = await db.nounce.findUnique({
            where: {
                walletAddress,
            },
        });

        return response?.nounce;
    } catch (error) {
        console.error('GET NOUNCE BY WALLET ADDRESS : NOUNCE HELPER : ', error);
        throw error;
    }
};
