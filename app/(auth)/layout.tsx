import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <h1>THIS IS AUTH</h1>
      {children}
    </section>
  );
};

export default AuthLayout;
