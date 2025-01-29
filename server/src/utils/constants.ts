import * as dotenv from 'dotenv';

dotenv.config();

export const constants = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  BY_PASS_URLS: ['/user/signup'],
};
