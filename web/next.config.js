/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'mhvlxgjbsteiwqhdiyhu.supabase.co'],
  },
};

module.exports = nextConfig;
