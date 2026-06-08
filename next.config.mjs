/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },

  // Redireciona www → non-www (Vercel também faz isso nas configurações de domínio,
  // mas manter aqui garante mesmo em preview deployments)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sitenoarexpress.com.br' }],
        destination: 'https://sitenoarexpress.com.br/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
