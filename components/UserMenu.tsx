"use client";

import Link from "next/link";
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";

const urls = [
  { pathname: "Leaderboard", path: "/performance" },
  { pathname: " Your Performance", path: "/statistics" },
];

function UserMenu() {
  const [isUserMenuOpen, setisUserMenuOpen] = useState<boolean>(false);


  return (
    <>
      <div
        className="p-2 text-xl  cursor-pointer"
   
        onClick={() => setisUserMenuOpen(!isUserMenuOpen)}>
        <div className="relative">
          <CgMenuGridO />

          {isUserMenuOpen && (
            <ul className="absolute bg-secondary z-10 sm:left-[-140px] left-[-110px] top-[60px] px-2 py-2  text-white rounded-md text-center text-nowrap">
              {urls.map(({ path, pathname }) => {
                return (
                  <li className="p-2" key={pathname}>
                    <Link
                      onClick={() => setisUserMenuOpen(false)}
                      className="hover:animate-pulse"
                      href={path}>
                      {pathname}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default UserMenu;
