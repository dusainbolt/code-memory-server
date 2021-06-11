export const environment = () => ({
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    API_KEY: process.env.API_KEY
});