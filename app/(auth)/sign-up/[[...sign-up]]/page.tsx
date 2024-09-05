import { SignUp } from "@clerk/nextjs";
import React from "react";

const SingUpPage = () => {
  return (
    <main className="w-full h-screen flex-center">
      <SignUp />
    </main>
  );
};

export default SingUpPage;
