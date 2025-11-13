"use client";
import Image from "next/image";
import { Button } from "./MTailwind";

export function FixedPlugin() {
  return (
      <Button
        color="white"
        size="sm"
        className="!fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <Image
          width={128}
          height={128}
          className="w-5 h-5"
          alt="Material Tailwind"
          src="https://www.material-tailwind.com/favicon.png"
        />{" "}
        PBKK Project
      </Button>
  );
}

export default FixedPlugin;