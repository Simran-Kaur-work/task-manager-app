import React from "react";
import Image from "../../../../../../Assets/Images/check-box.png";

export default function Header() {
  return (
    <div className="flex ">
      <div>
        <img src={Image} alt="check-box" className="h-14 w-14" />
      </div>
      <p className="font-bold text-5xl">Tasks</p>
    </div>
  );
}
