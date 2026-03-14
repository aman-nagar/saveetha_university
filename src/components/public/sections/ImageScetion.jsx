import React from "react";
import img from "../../../assets/images/bottomEducation.png";

export default function ImageSection() {
  return (
    <section className="w-full my-4 overflow-hidden">
      <img
        src={img}
        alt="University Visual"
        className="w-full h-auto min-h-[40vh] md:h-[70vh] object-cover md:object-center object-[75%] block"
      />
    </section>
  );
}
