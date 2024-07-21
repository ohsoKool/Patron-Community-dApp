"use client";
import React from "react";
import { ExternalProvider } from "@ethersproject/providers";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

type middleWareType = Response | undefined;

const page = () => {
  const walletConnect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request!({
        method: "eth_requestAccounts",
      });

      console.log(accounts[0]);
    }
  };
  return (
    <>
      <h1 className="text-white">THIS IS WALLET</h1>
      <Button onClick={walletConnect}>Connect</Button>
    </>
  );
};

export default page;
