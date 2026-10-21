import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { Composition } from "remotion";
import { Hero, type HeroProps } from "./Hero";

const shared = {
  component: Hero,
  durationInFrames: 240,
  fps: 30,
  width: 1200,
  height: 360,
};

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        {...shared}
        id="HeroDark"
        defaultProps={{ theme: "dark" } satisfies HeroProps}
      />
      <Composition
        {...shared}
        id="HeroLight"
        defaultProps={{ theme: "light" } satisfies HeroProps}
      />
    </>
  );
};
