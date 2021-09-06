export const environment = () => ({
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    APP_KEY: process.env.APP_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_PUBLIC_BUCKET_NAME: process.env.AWS_PUBLIC_BUCKET_NAME
});

// bucketName: 'code-memory',
// // dirName: 'media' /* optional */,
// region: 'ap-southeast-1',
// accessKeyId: 'AKIAUYZ7AQ5QF7I5RSM7',
// secretAccessKey: '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',
// s3Url: 'https://code-memory.s3.ap-southeast-1.amazonaws.com' /* optional */,