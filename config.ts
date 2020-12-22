import * as dotenv from 'dotenv';
import { readSecret } from './utils';

dotenv.config();

const config = {
  AUTHENTICATION_SECRET_KEY: readSecret('AUTHENTICATION_SECRET_KEY') || process.env.AUTHENTICATION_SECRET_KEY,
  AWS_SECRET_ACCESS: readSecret('AWS_SECRET_ACCESS') || process.env.AWS_SECRET_ACCESS,
  AWS_ACCESS_KEY: readSecret('AWS_ACCESS_KEY') || process.env.AWS_ACCESS_KEY,
  NODE_ENV: readSecret('NODE_ENV') || process.env.NODE_ENV,
  MLAB_URI: readSecret('MLAB_URI') || process.env.MLAB_URI,
};

export default config;
