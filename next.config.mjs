/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GEOLOCATION_API: process.env.GEOLOCATION_API,
        OPEN_WEATHER_API: process.env.OPEN_WEATHER_API
    }
};

export default nextConfig;
