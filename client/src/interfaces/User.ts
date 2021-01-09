export interface User {
  _id?: string,
  email: string,
  password: string,
  name: string,
  surname: string,
  following?: string[],
  followers?: string[],
  description?: string,
  profileImage?: string,
}
