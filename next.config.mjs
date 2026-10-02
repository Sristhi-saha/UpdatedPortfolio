/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'gsap'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
