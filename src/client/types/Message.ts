export interface Message {
  readonly _id: string,
  readonly authorId: string,
  text: string,
  image: string,
  date: number
}