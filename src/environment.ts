export const environment = () => ({
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    APP_KEY: process.env.APP_KEY
});