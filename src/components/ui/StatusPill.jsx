import React from "react";

const StatusPill = ({ children = "CLINIC OPEN" }) => {
  return (
    <div className="relative flex h-[38px] items-start justify-center bg-f6f4ee">
      <div
        className="
          flex
          items-center
          gap-2
          rounded-b-[39px]
          bg-[#1f4033]
          px-8
          py-2
          text-[13px]
          font-medium
          text-white
          shadow-sm
          sm:px-10
        "
      >
        <span
          className="
            h-2
            w-2
            rounded-full
            bg-emerald-400
            pulse-dot
          "
        />

        <span className="whitespace-nowrap ">{children}</span>
      </div>
    </div>
  );
};

export default StatusPill;
