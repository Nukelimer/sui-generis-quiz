"use client";

import Link from "next/link";
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";

const urls = [
  { pathname: "Your Performance", path: "/perfomance" },
  { pathname: "Leaderboard", path: "/leaderboard" },
];

function UserMenu() {
  const [isUserMenuOpen, setisUserMenuOpen] = useState<boolean>(false);
  console.log(isUserMenuOpen);

  return (
    <>
      <div
        className="p-2 text-xl mt-2 cursor-pointer"
        onMouseEnter={() => {
          setisUserMenuOpen(true);
        }}
        onMouseLeave={() => {
          setisUserMenuOpen(false);
        }}
        onClick={() => setisUserMenuOpen(!isUserMenuOpen)}>
        <div className="relative">
          <CgMenuGridO />

          {isUserMenuOpen && (
            <ul className="absolute bg-secondary z-10 top-10 sm:left-[-120px] left-[-120px] p-3 text-white rounded-md text-center text-nowrap">
              {urls.map(({ path, pathname }) => {
                return (
                  <li className="" key={pathname}>
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
