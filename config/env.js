import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

//  easy to switch between development and priduction environments
//  by changing the NODE_ENV variable in the .env file. So we do't need to override it
export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRATION,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_TOKEN,
  QSTASH_URL,
  SERVER_URL,
  EMAIL_PASSWORD,
} = process.env;
