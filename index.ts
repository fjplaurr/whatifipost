import * as dotenv from 'dotenv';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cors from 'cors';
import { postsRoutes, usersRoutes } from './routes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `${__dirname}/.env` });
} else {
  dotenv.config();
}

const app = express();

// Database connection
const uri = process.env.NODE_ENV !== 'production' ? 'mongodb://localhost/postApp' : process.env.MLAB_URI;
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

// Error handling
// eslint-disable-next-line no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).render('error', { error });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT,
  () => console.log(`Listening on port ${PORT}`));
