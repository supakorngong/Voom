import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React from "react";

const MeetingSetup = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-3 text-red-700">
      <h1 className="text-2xl font-bold">setUp</h1>
      <VideoPreview />
    </div>
  );
};

export default MeetingSetup;
