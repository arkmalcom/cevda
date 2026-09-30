import React from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () =>
  import("./motionFeatures").then((module) => module.default);

const MotionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);

export default MotionProvider;
