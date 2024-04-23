// Import the Next.js type for configuration if using TypeScript (optional)
/** @type {import('next').NextConfig} */

// Define the Next.js configuration object with a custom webpack configuration
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    // Add a rule for handling SVG files using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/, // This ensures that SVGs are only processed when imported in JavaScript/TypeScript files
      use: [
        {
          loader: "@svgr/webpack", // Specify the loader
          options: {
            icon: true, // Set options for SVGR
          },
        },
      ],
    });

    // Return the modified configuration
    return config;
  },
  reactStrictMode: true, // It's a good practice to enable React's strict mode
};

// Export the configuration object
export default nextConfig;
