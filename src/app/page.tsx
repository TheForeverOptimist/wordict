"use client";

import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Button } from "@/app/components/ui/button";
import WelcomeScreen from "@/app/components/WelcomeScreen";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [welcomeDone, setWelcomeDone] = useState<boolean>(false);

  return (
    <>
      {!welcomeDone && <WelcomeScreen onDone={() => setWelcomeDone(true)} />}
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur">
          <div>
            <h4 className="font-mono text-gray-800 max-w-4xl text-500 text-5xl font-bold md:text-6xl lg:text-7xl">
              <span className="text-green-500">Word</span>ict
            </h4>
          </div>
        </div>
        <p className="flex items-center justify-center text-center font-mono max-w-prose mx-auto my-12 px-4 text-2xl md:text-3xl lg:text-4xl">
          Get 10 chances to guess a 4-letter word, without being told the
          letters.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            className="rounded-full border shadow-md border-gray-300 mx-auto h-30 w-25 md:w-35 lg:w-40"
            variant="outline"
          >
            How to play
          </Button>
          <Button
            className="rounded-full border shadow-md border-gray-300 mx-auto h-30 w-20 md:w-35 lg:w-40"
            variant="outline"
          >
            Log In
          </Button>
          <Link href="/dashboard">
            <Button className="rounded-full border shadow-md border-white-300 mx-auto h-30 w-20 md:w-35 lg:w-40">
              Play
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
