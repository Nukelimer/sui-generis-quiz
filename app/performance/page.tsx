import { prisma } from "@/lib/prisma";

import Image from "next/image";

import { FaCrown } from "react-icons/fa";

async function page() {
  const users = await prisma.user.findMany({
    include: { quizResults: true },
  });

  users.sort(
    (a, b) =>
      b.quizResults.reduce(
        (initialValue, current) => initialValue + current.quizScore,
        0
      ) -
      a.quizResults.reduce(
        (initialValue, current) => initialValue + current.quizScore,
        0
      )
  );

  return (
    <div className=" m-w-[1500px] w-[90%] mx-auto py-10">
      <h1 className="font-bold mb-4 text-center text-2xl uppercase ">
        {" "}
        Leaderboards
      </h1>

      <ol>
        {users.map((user, index) => {
          return (
            <li
              key={user.id}
              className={`py-4 ${index < 3 ? "font-bold" : ""}`}>
              <div className="flex items-center gap-5 w-full">
                <div className="flex  sm:flex-row flex-col gap-1 justify-between items-center w-full">
                  <div
                    className="flex gap-3 items-center
                          ">
                    <span className="text-xl mb-1">{index + 1}</span>
                    <Image
                      src={user.profilePic}
                      width={30}
                      height={30}
                      alt="user"
                      className="rounded-2xl"
                    />
                    <span className="">{user.username.split(" ")[0]}</span>

                    {index === 0 && (
                      <FaCrown className="inline-block w-6 h-6 text-secondary" />
                    )}
                  </div>
                  <span>
                    Total Quiz Score{" "}
                    {user.quizResults.reduce(
                      (initialValue, current) =>
                        initialValue + current.quizScore,
                      0
                    )}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default page;
