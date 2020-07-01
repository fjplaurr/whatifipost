import * as dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `${__dirname}/.env` });
} else {
  dotenv.config();
}
import {
  NextFunction,
  Request,
  Response
} from 'express';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cors from 'cors';
import { postsRoutes, usersRoutes } from './routes';

const app = express();

// Database connection
const uri = process.env.NODE_ENV !== 'production' ? 'mongodb://localhost/postApp' : process.env.MLAB_URI

uri && mongoose.connect(uri, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

// Error handling
app.use(function (req: Request, res: Response, next: NextFunction) {
  let err = new Error('Not found');
  next(err);
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT,
  () => console.log(`Listening on port ${PORT}`)
);
