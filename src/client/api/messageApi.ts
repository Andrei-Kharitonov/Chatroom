import axios from "axios";
import { Message } from "../types/Message";
import { serverUrl } from "./serverUrl";

export class MessageAPI {
  static async getAll(): Promise<Message[]> {
    return (await axios.get(`${serverUrl}/message/get-all`)).data;
  }

  static async create(text: string, authorId: string): Promise<Message> {
    return (await axios.post(`${serverUrl}/message/create`, {
      authorId, text
    })).data;
  }

  static async delete(id: string, userLogin: string, userPassword: string): Promise<Message> {
    return (await axios.delete(`${serverUrl}/message/delete/${id}?login=${userLogin}&password=${userPassword}`)).data;
  }
}