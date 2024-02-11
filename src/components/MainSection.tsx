import React, { useRef } from "react";
import Typed from "typed.js";
import { useInView } from "framer-motion";
import { useEffect } from "react";
import Waterfall from "./Waterfalll";
import Socials from "./Socials";
import { Page } from "./MainApp";

let typedName: Typed;
let typedJob: Typed;

const HEADING_1_START_DELAY = 1800;

const defaultTypedOptions = {
  typeSpeed: 20,
  showCursor: true,
  cursorChar: "_",
};

type MainSectionProps = {
  isLoading: boolean;
  onVisibilityChange: (page: Page, isInView: boolean) => void;
};

const MainSection = ({ isLoading, onVisibilityChange }: MainSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    typedName = new Typed("#typed-name", {
      ...defaultTypedOptions,
      strings: [`lightradius`],
      startDelay: HEADING_1_START_DELAY,
    });

    return () => {
      typedName?.destroy();
      typedJob?.destroy();
    };
  }, []);

  useEffect(() => {
    onVisibilityChange(Page.Main, isInView);
  }, [isInView, onVisibilityChange]);

  return (
    <main className="flex min-h-full w-full flex-col items-center justify-center">
      <div className="flex h-16 w-[201px] flex-col items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold" ref={ref}>
            <span id="typed-name"></span>
          </h1>
          <h2>
            <span className="text-xl" id="typed-job"></span>
          </h2>
        </div>
      </div>
      <Socials />
      <Waterfall isLoading={isLoading} />
    </main>
  );
};

export default MainSection;
