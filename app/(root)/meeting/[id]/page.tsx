"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return <p className="text-center text-3xl font-bold text-white">Call Not Found</p>;

  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>{isSetupComplete ? <MeetingRoom /> : <MeetingSetup />}</StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
