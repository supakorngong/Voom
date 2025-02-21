"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image src="/icons/hamburger.svg" width={26} height={26} alt="hambugerIcon" className="cursor-pointer sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/icons/logo.svg" alt="yoom" width={32} height={32} className="max-sm:size-10" />
            <p className="text-[26px] font-extrabold text-white">yoom</p>
          </Link>
          <div className="flex flex-col justify-between h-[calc(100vh-72px)] overflow-y-auto ">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-26 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
                  console.log(pathName);
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link href={link.route} key={link.label} className={cn("flex gap-4 items-center rounded-lg w-full max-w-60", { "bg-blue-1": isActive })}>
                        <Image src={link.imgURL} alt={link.label} width={20} height={20} />
                        <p className="font-semibold ">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
