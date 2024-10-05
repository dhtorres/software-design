import dotenv from 'dotenv';
dotenv.config();

export const APPLICATION = {
    PORT: process.env.PORT,
};

export const JWT = {
    KEY: process.env.JWT_KEY,
};

export const MONGO = {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
};
