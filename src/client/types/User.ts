export interface User {
  readonly _id: string,
  login: string,
  password: string,
  avatar: string,
  post: string,
  banned: boolean
}

export interface SecurityUser {
  readonly _id: string,
  login: string,
  avatar: string,
  post: string,
  banned: boolean
}