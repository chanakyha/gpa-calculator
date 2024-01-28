"use client";

import { Hourglass } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-20rem)]">
      <Hourglass
        visible={true}
        height="40"
        width="40"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["green", "yellow"]}
      />
    </div>
  );
};

export default LoadingPage;
