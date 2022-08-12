import React from "react";

// component for loading
function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <img src="../assets/images/logo.png" alt="logo" className="w-32" />
      <h1 className="logo-font uppercase font-medium text-2xl">emg</h1>
    </div>
  );
}

export default Loading;
