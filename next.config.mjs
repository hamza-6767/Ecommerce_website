/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            // Leaving port and pathname empty means "allow all"
            port: '',
            pathname: '**',
          },
        ],
      },
    };
    


export default nextConfig;
