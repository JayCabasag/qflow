"use client";

import Marquee from "react-fast-marquee";

export function AnnouncementMarquee() {
  const announcements = [
    "Welcome to TodayQ! Please maintain social distancing while waiting.",
    "Number A004 please proceed to Counter 1 - Sarah Johnson",
    "Number A005 please proceed to Counter 2 - Emily Davis",
    "Please have your documents ready when called",
    "Number B001 please proceed to Manager - David Wilson",
    "Thank you for your patience. Average wait time is 15 minutes",
    "Number A006 please proceed to Counter 3 - James Miller",
  ];

  return (
    <div className="bg-amber-500 border-l-4 border-l-amber-600 overflow-hidden">
      <div className="flex items-center h-8">
        <div className="flex-1 overflow-hidden">
          <Marquee>
            {announcements.map((a, index) => {
              return (
                <div className="whitespace-nowrap" key={index}>
                  <span className="text-md font-medium text-white px-4">
                    {a}
                  </span>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
