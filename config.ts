import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `${__dirname}/.env` });
} else {
  dotenv.config();
}

const config = {
  AUTHENTICATION_SECRET_KEY: process.env.AUTHENTICATION_SECRET_KEY,
  AWS_SECRET_ACCESS: process.env.AWS_SECRET_ACCESS,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  NODE_ENV: process.env.NODE_ENV,
  MLAB_URI: process.env.MLAB_URI,
  PORT: process.env.PORT,
};

export default config;
