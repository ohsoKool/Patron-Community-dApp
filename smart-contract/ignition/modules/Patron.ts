import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PatronModule = buildModule("PatronModule", (m) => {
  const patron = m.contract("Patron");

  return { patron };
});

export default PatronModule;
