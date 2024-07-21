import { ReactNode } from "react";
import { useParams } from "react-router-dom";

type ProtectedCompType = {
  children: ReactNode;
};

const ProtectedComp = ({ children }: ProtectedCompType) => {
  const params = useParams();
  console.log("PARAMS: ", params);
  return (
    <>
      <h1>THIS IS PROTECTED ROUTE</h1>
      {children}
    </>
  );
};

export default ProtectedComp;
