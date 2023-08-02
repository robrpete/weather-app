/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  env: {
    APIkey: process.env.APIkey,
  }
}

module.exports = nextConfig
