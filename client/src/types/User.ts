export interface User {
  readonly _id: string,
  login: string,
  password: string,
  post: string,
  banned: boolean
}

export interface SecurityUser {
  readonly _id: string,
  login: string,
  post: string,
  banned: boolean
}