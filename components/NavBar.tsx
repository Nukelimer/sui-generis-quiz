"use client";

import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();

  const quizpath = pathname === "/quiz";
  return (
    <div className="  w-full h-[100px]  border-b-2 border-slate-400 py-5 flex  ">
      <div className="  w-screen flex justify-between items-center px-4  hover:animate-pulse">
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
            <span className="text-[0.69em] text-dark font-bold">
              Sui-Generis
            </span>
            <span className="text-[0.69em] text-dark font-bold">
              LL.B 2023, AAU.
            </span>
          </div>{" "}
        </Link>
        {quizpath == true ? (
          <div> Quiz</div>
        ) : (
          <div>Memories Quiz.</div>
        )}
        <div className="flex items-center space-x-3">
          <UserMenu />
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

// import { UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { MdQuiz } from "react-icons/md";
// import UserMenu from "./UserMenu";

// const Navbar = () => {
//   return (
//     <div className="pt-5 w-full">
//       <div className="max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b pb-5">
//         <div>
//           <Link
//             href={"/"}
//             className="flex gap-1 items-center text-2xl"
//           >
//             <h1 className="text-dark font-bold">
//               CodeQuiz
//             </h1>
//             <MdQuiz className="text-primary" />
//           </Link>
//         </div>

//         <div className="md:block hidden text-nowrap">
//           <span className="bg-primary px-5 py-1 rounded-md text-white">
//             Today's Category: Javascript
//           </span>
//         </div>

//         <div className="flex items-center gap-3 justify-end">
//           <UserMenu />
//           <UserButton />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
