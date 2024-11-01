// src/ethProvider.js
import Web3 from 'web3';
import { GetContractPropType } from '@/lib/types';

export const getWeb3 = () => {
  return new Web3(window.ethereum);
};

export const getContract = ({ contractABI, contractAddress }: GetContractPropType) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(contractABI, contractAddress);
};
