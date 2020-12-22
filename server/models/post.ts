import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { User } from '.';

class Post {
  @prop()
  public text?: string;

  @prop()
  public date?: Date;

  @prop({ ref: () => User })
  public author?: Ref<User>;
}

const PostModel = getModelForClass(Post);

export { Post, PostModel };
