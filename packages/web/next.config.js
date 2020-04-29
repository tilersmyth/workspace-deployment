const { PHASE_PRODUCTION_BUILD } = require("next/constants");

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD ? true : false;

  return {
    env: {
      API_URL: isProd ? undefined : "http://localhost:4000/graphql",
    },
  };
};
