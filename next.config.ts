import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://media.api-sports.io/football/teams/**')],
  },
}

export default nextConfig;
