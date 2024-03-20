import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { UserButton } from "@clerk/nextjs";

function NavBar() {
  return (
    <div className=" w-full border-b py-5 ">
      <div className=" w-screen flex justify-between items-center px-4  hover:animate-pulse">
        <Link href={"/"} className="flex gap-1 items-center ">
          <Image
            src={"/logo/logo.jpg"}
            alt="logo"
            width={30}
            height={30}
            priority
            quality={100}
            className="rounded-xl"
          />
          <div className="hover:font-raleway flex flex-col hover:--font-raleway ">
          <span className="text-[0.69em] text-dark font-bold">Sui-Generis</span>
          <span className="text-[0.69em] text-dark font-bold">LL.B 2023, AAU.</span>
          </div>{" "}
        </Link>
        <div className=""></div>
        <div className="flex items-center space-x-3">
          <UserMenu  />
          <UserButton/>
    </div>
      </div>
    </div>
  );
}

export default NavBar;
