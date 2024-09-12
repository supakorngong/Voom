import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <h1 className="flex-center h-screen w-ful">
      <Image src="/icons/loading-circle.svg" alt="icons" width={50} height={50} priority={true} />
    </h1>
  );
};

export default Loader;
