import React from "react";
import HeadphonesIcon from "./Headphones";

const AnimatedHeadphonesIcon = ({ active }: { active: boolean }) => {
  return (
    <div className="flex h-20 w-20 items-center justify-center transition duration-500 ease-out-expo">
      <span className="flex items-center justify-center">
        <HeadphonesIcon customStyles="fill-white transition duration-500 ease-out-expo" />
        <span
          className={`absolute left-1/2 -ml-[13px] h-[2px] w-7 -rotate-45 scale-x-0 bg-white transition duration-500 ease-out-expo ${
            active ? "" : "-rotate-45 scale-x-100"
          }`}
        ></span>
      </span>
    </div>
  );
};

export default AnimatedHeadphonesIcon;
