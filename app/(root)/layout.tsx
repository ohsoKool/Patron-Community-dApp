"use client";
import useWalletStore from "@/lib/zustand/walletStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isConnected } = useWalletStore();
  useEffect(() => {
    if (!isConnected) {
      router.push("/auth/wallet-connect");
    }
  }, []);
  return (
    <section>
      <h1 className="text-white">THIS IS ROOT</h1>
      {children}
    </section>
  );
};

export default RootLayout;
