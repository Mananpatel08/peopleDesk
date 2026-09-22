"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";
import { FC } from "react";
import DashboardBanner from "../../../public/bg/dashboard-bg.png";
import { useUserContext } from "@/context";


export interface IUserGreetingsView {
  // user: User | null;
}

export const UserGreetingsView: FC<IUserGreetingsView> = (props) => {
  const { } = props;
  // current time hook
  const { user } = useUserContext();
  const { currentTime } = useCurrentTime();

  const hour = new Intl.DateTimeFormat("en-US", {
    hour12: false,
    hour: "numeric",
  }).format(currentTime);
  const minute = new Intl.DateTimeFormat("en-US", {
    hour12: false,
    minute: "numeric",
  }).format(currentTime);

  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(currentTime);

  const weekDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(currentTime);

  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentTime);

  const greeting =
    parseInt(hour, 10) < 12
      ? "Morning"
      : parseInt(hour, 10) === 12 && parseInt(minute, 10) === 0
        ? "Noon"
        : parseInt(hour, 10) < 18
          ? "Afternoon"
          : "Evening";
  // const background_image = `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.cover_image_url}`;
  const background_image = DashboardBanner.src;

  return (
    <div
      className="flex justify-between homepage-greeting pl-8 pe-5 py-5"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "100%",
        backgroundColor: "#316a9a",
        backgroundBlendMode: "multiply",
        minHeight: "180px",
        marginLeft: "-10px",
      }}
    >
      <div className="w-full">
        <h3 className="text-xl font-medium text-white">
          Good {greeting}, {user?.first_name} {user?.last_name}
        </h3>
        <h6 className="flex text-l items-center gap-2 font-normal text-white mb-5">
          {weekDay}, {date} {timeString}
        </h6>
      </div>
    </div>
  );
};
