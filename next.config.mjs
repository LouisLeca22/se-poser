/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'qnbwadfoccshyyuqwovp.supabase.co',
      },
    ],
  },
};

export default nextConfig;
