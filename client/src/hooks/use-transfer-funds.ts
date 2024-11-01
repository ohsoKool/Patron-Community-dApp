// useTransferFunds.ts
import { useState, useCallback } from 'react';
import { AbiItem } from 'web3-utils';

import {
  TRANSACTION_ABI,
  TRANSACTION_ADDRESS,
  RECIPIENT_ADDRESS,
} from '@/lib/smartContract/transactionEnv';
import { getContract, getWeb3 } from '@/lib/smartContract/web3';
import { UseTransferFundsResult } from '@/lib/types';
import { TransactionStatus } from '@/lib/enum';

export const useTransferFunds = (): UseTransferFundsResult => {
  const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.Idle);
  const [error, setError] = useState<string | undefined>();

  const contractMethod = useCallback(
    async (amount: string | number): Promise<TransactionStatus> => {
      const web3 = getWeb3();
      const accounts = await web3.eth.requestAccounts();

      if (!accounts || !accounts[0]) {
        setError('No MetaMask account detected.');
        return TransactionStatus.Failed;
      }

      const contract = getContract({
        contractABI: TRANSACTION_ABI.abi as AbiItem[],
        contractAddress: TRANSACTION_ADDRESS,
      });

      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

      try {
        setStatus(TransactionStatus.Sending);

        await new Promise<void>((resolve, reject) => {
          contract.methods
            .transferFunds(RECIPIENT_ADDRESS)
            .send({ from: accounts[0], value: amountInWei })
            .on('transactionHash', () => {
              setStatus(TransactionStatus.Sending);
            })
            .on('receipt', () => {
              setStatus(TransactionStatus.Confirmed);
              resolve();
            })
            .on('error', (err: Error) => {
              console.error('Transaction failed:', err);
              setStatus(TransactionStatus.Failed);
              setError(err.message);
              reject(err);
            });
        });

        return status;
      } catch (err) {
        console.error('Transaction failed! Error:', err);
        setStatus(TransactionStatus.Failed);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        return TransactionStatus.Failed;
      }
    },
    [status]
  );

  return {
    contractMethod,
    status,
    error,
  };
};
