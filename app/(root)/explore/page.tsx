"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const path = usePathname();
  const isConnected = true;

  useEffect(() => {
    if (path == "/explore" && !isConnected) {
      router.push("/auth/wallet-connect");
    }
  }, []);
  return (
    <div>
      <h1 className="text-white">THIS IS EXPLORE</h1>
    </div>
  );
};

export default page;
