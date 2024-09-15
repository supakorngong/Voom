import CallList from "@/components/CallList";
import React from "react";

const RecordingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">RecordingPage</h1>
      <CallList type="recording" />
    </section>
  );
};

export default RecordingPage;
