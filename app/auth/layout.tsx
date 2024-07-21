"use client";
import useWalletStore from "@/lib/zustand/walletStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isConnected } = useWalletStore();
  useEffect(() => {
    if (isConnected) {
      router.push("/explore");
    }
  }, []);
  return (
    <section>
      <h1 className="text-white">THIS IS AUTH</h1>
      {children}
    </section>
  );
};

export default AuthLayout;
