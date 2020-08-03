// eslint-disable-next-line import/order
import config from './config';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cors from 'cors';
import { serializeError } from 'serialize-error';
import {
  postsRoutes, usersRoutes, authRoutes, fileRoutes,
} from './routes';

// Initializes express application
const app = express();

// Database connection
const uri = config.NODE_ENV !== 'production' ? 'mongodb://localhost/postApp' : config.MLAB_URI;
const startMongoConnection = async () => {
  try {
    uri && await mongoose.connect(uri, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('The connection to Mongodb was not successful');
  }
};
startMongoConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/image-upload', fileRoutes);

// Express default error handling
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handles errors for headers that have already been sent to the client
  if (res.headersSent) {
    return next(err);
  }
  const serializedError = serializeError(err);
  return res.status(500).send({ error: serializedError });
};
app.use(errorHandler);

// Server listening
const port = config.PORT || 5000;
app.listen(port,
  () => console.log(`Server listening on port ${port}`));
