"ts no-check";
"use client";
import useGetCall from "@/hooks/useGetCall";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { Client } from "@clerk/nextjs/server";
import { useToast } from "@/hooks/use-toast";

const CallList = ({ type }: { type: "upcoming" | "recording" | "ended" }) => {
  const { upcomingCalls, recordingCall, endedCalls, isLoading } = useGetCall();
  const [recording, setRecording] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    if (type === "recording") fetchRecording();
  }, [type, recordingCall]);

  if (isLoading) return <Loader />;

  const getCalls = () => {
    switch (type) {
      case "upcoming":
        console.log(upcomingCalls);
        return upcomingCalls;
      case "recording":
        console.log(recording, "rec");
        return recording;
      case "ended":
        return endedCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "upcoming":
        return "No Upcoming Call";
      case "recording":
        return "No Recording";
      case "ended":
        return "No previous Call";
      default:
        return [];
    }
  };
  const fetchRecording = async () => {
    try {
      const callData = await Promise.all(recordingCall.map((meeting) => meeting.queryRecordings()));
      const recordings = callData.filter((call) => call?.recordings.length > 0).flatMap((call) => call.recordings);
      setRecording(recordings);
    } catch (error) {
      toast({
        title: "Try Again later",
      });
    }
  };

  const calls = getCalls();

  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl-grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            icon={type === "ended" ? "/icons/previous.svg" : type === "recording" ? "/icons/recordings" : "/icons/upcoming.svg"}
            key={(meeting as Call)?.id}
            title={(meeting as Call).state?.custom?.description || (meeting as CallRecording)?.filename?.substring(0, 20) || "Personal meeting"}
            date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time?.toLocaleString()}
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recording" ? "/icons/play.svg" : undefined}
            buttonText={type === "recording" ? "Play" : "Start"}
            handleClick={() => {
              if (type === "recording") {
                router.push(`${(meeting as CallRecording).url}`);
              } else {
                router.push(`/meeting/${(meeting as Call).id}`);
              }
            }}
            link={type === "recording" ? (meeting as CallRecording).url : `meeting/${(meeting as Call).id}`}
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
