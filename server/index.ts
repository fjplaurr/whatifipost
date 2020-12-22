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
const uri = config.MLAB_URI;
console.log(`Connecting to database ${uri}`);
const startMongoConnection = async () => {
  try {
    uri && await mongoose.connect(uri, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to ${uri}`);
  } catch (error) {
    console.log('The connection to Mongodb was not successful');
  }
};
startMongoConnection();

// Middlewares
app.use(cors<Request>());
app.use(express.json());

// Routes
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);
app.use('/image-upload', fileRoutes);

app.get('/error-test', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('el que sea');
  next(error);
});

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
const port = 5000;
app.listen(port,
  () => console.log(`Server listening on port ${port}`));
