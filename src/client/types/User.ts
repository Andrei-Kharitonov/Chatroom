export interface User {
  readonly _id: string,
  login: string,
  password: string,
  avatarPath: string,
  post: string,
  banned: boolean
}

export interface SecurityUser {
  readonly _id: string,
  login: string,
  avatarPath: string,
  post: string,
  banned: boolean
}