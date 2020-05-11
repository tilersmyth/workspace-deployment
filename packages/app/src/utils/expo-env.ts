import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost =
  Platform.OS === "ios"
    ? "http://localhost:4000/graphql"
    : "10.0.2.2:4000/graphql";

const ENV = {
  dev: {
    API_HOST: localhost,
    COOKIE_NAME: "sid",
  },
  prod: {
    API_HOST: "[to do]",
    COOKIE_NAME: "[to do]",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (
    env === null ||
    env === undefined ||
    env === "" ||
    env.indexOf("dev") !== -1
  )
    return ENV.dev;

  return ENV.prod;
};

export const { API_HOST, COOKIE_NAME } = getEnvVars();
