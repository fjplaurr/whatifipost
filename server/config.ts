import { readSecret } from './utils';

const config = {
  AUTHENTICATION_SECRET_KEY: readSecret('AUTHENTICATION_SECRET_KEY'),
  AWS_SECRET_ACCESS: readSecret('AWS_SECRET_ACCESS'),
  AWS_ACCESS_KEY: readSecret('AWS_ACCESS_KEY'),
  NODE_ENV: readSecret('NODE_ENV'),
  MLAB_URI: readSecret('MLAB_URI'),
};

export default config;
