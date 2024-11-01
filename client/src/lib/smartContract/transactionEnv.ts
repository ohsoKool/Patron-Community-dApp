export const TRANSACTION_ABI = {
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [],
      name: 'getContractBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address payable',
          name: '_to',
          type: 'address',
        },
      ],
      name: 'transferFunds',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
};

export const TRANSACTION_ADDRESS = import.meta.env.VITE_TRANSACTION_CONTRACT_DEPLOYED_ADDRESS;

export const RECIPIENT_ADDRESS = import.meta.env.VITE_RECIPIENT_ADDRESS;
