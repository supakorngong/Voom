"use client";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// ###### connect to clerk : each clerk user is connected to stream user #########
// const userId = "user-id";
// const token = "authentication-token";

interface User {
  id: string;
  username: string;
  image?: string;
}

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  const { user, isLoaded } = useUser() as { user: User; isLoaded: boolean };

  const userClerk: User = { id: user?.id, username: user?.username || user?.id, image: user?.image };

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API key missing");
    //only if user here and API key
    const client = new StreamVideoClient({
      apiKey: apiKey,
      user: userClerk,
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
