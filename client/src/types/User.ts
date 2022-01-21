export interface User {
  _id: string,
  login: string,
  password: string,
  post: string,
  banned: boolean
}

export interface SecurityUser {
  id: string,
  login: string,
  post: string,
  banned: boolean
}