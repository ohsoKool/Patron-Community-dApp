import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TransactionModule = buildModule("TransactionModule", (m) => {
  const transaction = m.contract("Transaction");

  return { transaction };
});

export default TransactionModule;
