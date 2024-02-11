import React, { useRef } from "react";
import Typed from "typed.js";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { EMAIL } from "../constants";

let typedMissionStatement: Typed;

const Footer = () => {
  const handleMissionStatementVisibilityChange = () => {
    if (typedMissionStatement) return;

    typedMissionStatement = new Typed("#mission-statement", {
      strings: [`Take back control of your digital <span className="text-orange-500">space.</span>`],
      typeSpeed: 10,
      showCursor: false,
    });
  };

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      handleMissionStatementVisibilityChange();
    }
  }, [isInView]);

  return (
    <footer ref={ref} className="flex flex-col items-center gap-6 bg-black/25 p-6 text-sm md:text-base">
      <div className="flex w-full max-w-[1600px]">
        <div className="flex w-full flex-1 flex-col justify-between gap-6 md:flex-row">
          <div className="flex w-full justify-between gap-6 md:w-auto md:justify-normal">
            <a href="https://github.com/lightradius" target="_blank" rel="noreferrer">
              Visit us on GitHub
            </a>
            <a href="https://linkedin.com/company/lightradius/about" target="_blank" rel="noreferrer">
              Visit us on LinkedIn
            </a>
          </div>
          <div>
            For specific inquiries contact us at{" "}
            <a href={`mailto:${EMAIL}`} target="_blank">
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[1600px] items-center md:justify-center">
        <div className="w-[243px]">
          <p id="mission-statement"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
