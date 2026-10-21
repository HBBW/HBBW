import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/index.ts");
Config.setVideoImageFormat("png");
Config.setCodec("gif");
Config.setEveryNthFrame(2);
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
