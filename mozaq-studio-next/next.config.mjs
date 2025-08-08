/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // play nice with Netlify static
  },
};

export default nextConfig;
