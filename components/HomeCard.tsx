"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface cardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = (props: cardProps) => {
  return (
    <div className={cn("flex flex-col justify-between px-4 py-6 bg-orange-1 w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer", props.className)} onClick={props.handleClick}>
      <div className="flex-center glass glassmorphism rounded-[10px] size-10">
        <Image src={props.img} alt="addMeeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <p className="text-lg font-normal">{props.description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
