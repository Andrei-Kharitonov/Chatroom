import axios from "axios";
import { SecurityUser, User } from "../types/User";
import { serverUrl } from "./serverUrl";

interface UpdatedUser {
  login: string,
  password: string,
  avatar: string
}

export class UserAPI {
  static async getAll(): Promise<SecurityUser[] | any[]> {
    return (await axios.get(`${serverUrl}/user/get-all`)).data;
  }

  static async getByLogin(login: string, password: string): Promise<User | null> {
    return (await axios.get(`${serverUrl}/user/get-by-login?login=${login}&password=${password}`)).data;
  }

  static async create(login: string, password: string): Promise<User | null> {
    return (await axios.post(`${serverUrl}/user/create`, {
      login, password
    })).data;
  }

  static async update(login: string, password: string, updatedUser: UpdatedUser): Promise<User | null> {
    return (await axios.put(`${serverUrl}/user/update?login=${login}&password=${password}`, updatedUser)).data;
  }

  static async setBan(id: string, login: string, password: string): Promise<SecurityUser | null> {
    return (await axios.put(`${serverUrl}/user/ban/${id}?login=${login}&password=${password}`)).data;
  }

  static async giveModerator(id: string, login: string, password: string): Promise<SecurityUser | null> {
    return (await axios.put(`${serverUrl}/user/set-moderator/${id}?login=${login}&password=${password}`)).data;
  }

  static async transferAdmin(id: string, login: string, password: string): Promise<SecurityUser | null> {
    return (await axios.put(`${serverUrl}/user/transfer-admin/${id}?login=${login}&password=${password}`)).data;
  }

  static async delete(id: string, login: string, password: string): Promise<User | null> {
    return (await axios.delete(`${serverUrl}/user/delete/${id}?login=${login}&password=${password}`)).data;
  }

  static async deleteAccount(id: string, login: string, password: string): Promise<User | null> {
    return (await axios.delete(`${serverUrl}/user/delete-account/?id=${id}&login=${login}&password=${password}`)).data;
  }
}