import { build, fake } from '@jackfranklin/test-data-bot';
import { User } from '../../client/src/interfaces/User';
import { Post } from '../../client/src/interfaces/Post';

const userBuilder = build<User>({
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    name: fake((f) => f.name.firstName()),
    surname: fake((f) => f.name.lastName()),
  },
});

const postBuilder = build<Post>({
  fields: {
    text: fake((f) => f.lorem.paragraph(Math.floor(Math.random() * 6) + 1)),
    date: fake((f) => f.date.past()),
    author: fake((f) => userBuilder()),
  },
});

export { userBuilder, postBuilder };
