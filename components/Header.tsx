import type { NextPage } from "next";
import Image from "next/image";
import {
  SearchIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto ">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            alt="Instagram"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          // onClick={() => router.push("/")}
          className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            alt="Instagram Icon"
            objectFit="contain"
          />
        </div>

        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right  */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          <MenuIcon className="h-12 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute hidden md:flex -top-1 -right-2 w-5 h-5 bg-red-500 rounded-full item-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                onClick={() =>signOut()}
                src={session.user.image}
                alt="profile pic"
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={(e: any) =>signIn(e)}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
