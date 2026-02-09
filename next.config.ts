import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:
                    "app.6f1348b917726755d8d02c2321a431d8.r2.cloudflarestorage.com",
                pathname: "/**",
            },
        ],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 1 month
        formats: ["image/webp", "image/avif"],
    },
};

export default withNextIntl(nextConfig);
