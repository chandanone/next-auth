"use client";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client"
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-dvh flex justify-center items-center bg-linear-500 from-purple-200 to-pink-500">
      <div className="flex justify-center items-center flex-col gap-2">
        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.35, delay: 0 }}
          className="text-4xl sm:text-6xl font-bold"
        >
          Amigos Alpha Labs
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.35, delay: 0.35 }}
          className="text-center text-black font-bolder"
        >
          Empowering businesses through innovative software consulting and stunning website design.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.35, delay: 0.7 }}
        >
          <Link href="/create">
            <Button className=" mt-3 font-bold p-5 bg-primary-300 border-black border-2 text-black hover:bg-white">Start Creating</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}