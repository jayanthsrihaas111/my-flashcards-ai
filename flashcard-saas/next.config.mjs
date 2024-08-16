/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeCss: false,  // Disables critters' CSS optimization to avoid the error
      },
};

export default nextConfig;
