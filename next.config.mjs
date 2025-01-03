/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      FLASK_BACKEND_URL: process.env.FLASK_BACKEND_URL || 'http://localhost:5000',
      SPRING_BOOT_BACKEND_URL: process.env.SPRING_BOOT_BACKEND_URL || 'http://localhost:8080',
    },
  
    reactStrictMode: true,
    
    async rewrites() {
        return [
          {
            source: '/api/flask/:path*',
            destination: `${process.env.FLASK_BACKEND_URL}/:path*`,
          },
          {
            source: '/api/spring/:path*',
            destination: `${process.env.SPRING_BOOT_BACKEND_URL}/:path*`,
          },
      ];
    },
};
  
export default nextConfig;