"use client";
import Profile from "./Profile/page";
import Projects from "./Projects/page";
import { useState } from "react";

const AccountPage = () => {
  const [accountPage, setAccountPage] = useState(<Profile />);

  const pages = [
    { name: "profile", component: <Profile /> },
    { name: "projects", component: <Projects /> },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {pages.map((item, index) => (
            <li
              key={index}
              onClick={() => setAccountPage(item.component)}
              className={`py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                accountPage.type == item.component.type ? "bg-gray-700 font-bold" : "hover:bg-gray-600"
              }`}
            >
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-10">
        {accountPage}
      </div>
    </div>
  );
};

export default AccountPage;
