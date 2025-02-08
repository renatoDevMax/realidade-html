import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desabilita o modo estrito do React para compatibilidade com AR.js
  reactStrictMode: false,

  // Configurações de segurança para permitir os scripts externos
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
