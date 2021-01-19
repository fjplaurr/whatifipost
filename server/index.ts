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
import * as jwt from 'jsonwebtoken';
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

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, config.AUTHENTICATION_SECRET_KEY, (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    return next();
  });
  return null;
};

// Routes
app.use('/users', verifyToken, usersRoutes);
app.use('/posts', verifyToken, postsRoutes);
app.use('/auth', authRoutes);
app.use('/image-upload', verifyToken, fileRoutes);

// Express default error handling
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handles errors for headers that have already been sent to the client
  if (res.headersSent) {
    return next(err);
  }
  const error = serializeError(err);
  // If a code !== 200 comes, that is because it has manually been handled
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(status).send({ error });
};
app.use(errorHandler);

// Server listening
app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));
