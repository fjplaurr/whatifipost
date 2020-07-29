import { User } from '.';

export interface Post{
  _id?: string,
  text: string,
  date: Date,
  author: User,
}
