import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { chaps3D } from "../constants";

const Chaps3D = () => {
  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-10 px-4 py-10 overflow-visible">
      {chaps3D.map(({ name, icon }) => (
        <div className="w-28 h-28" key={name}>
          <BallCanvas icon={icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Chaps3D, "");S