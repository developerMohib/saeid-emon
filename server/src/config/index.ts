import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI || '',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    nodeEnv: process.env.NODE_ENV || 'development',
};