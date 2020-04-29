import Router from "next/router";

import { NextPageContextWithApollo } from "../apollo/config/types";

export const redirect = (ctx: NextPageContextWithApollo, target: string) => {
  if (!ctx.res) {
    // Browser
    Router.replace(target);
    return;
  }

  // Server
  ctx.res.writeHead(303, { Location: target });
  ctx.res.end();
};
