"use client";
import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { link } from "fs";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();
  //
  const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>(undefined);
  //
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({ dateTime: new Date(), description: "", link: "" });
  const [callDetail, setCallDetail] = useState<Call>();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();

      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);

      if (!values?.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting Created",
      });
    } catch (err) {
      toast({
        title: "Schedule Failed",
      });
      console.log(err);
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard img="/icons/add-meeting.svg" title="New Meeting" description="Start an instant meeting" handleClick={() => setMeetingState("isInstantMeeting")} />

      <HomeCard img="/icons/schedule.svg" title="Schedule Meeting" description="Plan your meeting" className="bg-blue-1" handleClick={() => setMeetingState("isScheduleMeeting")} />

      <HomeCard img="/icons/recordings.svg" title="View Recordings" description="Meeting Recordings" className="bg-yellow-1" handleClick={() => router.push("/recordings")} />

      <HomeCard img="/icons/join-meeting.svg" title="Join Meeting" description="via invitation link" className="bg-purple-1" handleClick={() => setMeetingState("isJoiningMeeting")} />

      {!callDetail ? (
        <MeetingModal isOpen={meetingState === "isScheduleMeeting"} onClose={() => setMeetingState(undefined)} title="Create Meeting" buttonText="Schedule Meeting" handleClick={createMeeting}>
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">Add a description</label>
            <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0" onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))} />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">select Date and Time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues((prev) => ({ ...prev, dateTime: date! }))}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d,yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Already Schedule"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "link copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="copy meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Join meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-dark-1 focus-visible:ring-0  focus-visible:ring-offset-0"
          onChange={(e) => setValues((prev) => ({ ...prev, link: e.target.value }))}
        />
      </MeetingModal>
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
