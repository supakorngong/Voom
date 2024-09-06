import MeetingTypeList from "@/components/MeetingTypeList";
const Home = () => {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(now);
  const time = now.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col justify-between h-full max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] text-center text-base rounded py-2">Upcoming Meeting at: {time}</h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-4xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
