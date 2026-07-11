/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal, self-contained server build for small Docker images
  // and clean deploys on Google Cloud Run.
  output: "standalone",
  reactStrictMode: true,
};

module.exports = nextConfig;
