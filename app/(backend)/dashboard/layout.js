import { SideNavBar } from "@/components/backend/SideNavBar";
import TopNavBar from "@/components/backend/TopNavBar";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-1/5 ">
        <SideNavBar />
      </div>
      <div className="flex flex-col w-4/5">
        <div className= 'h-16'>
          <TopNavBar />
        </div>

        <main className="min-h-screen mt- bg-slate-800 ">{children}</main>
      </div>
    </div>
  );
}
