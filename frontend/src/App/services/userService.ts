import { ServerBaseResponse } from "../models/ServerBaseResponse";

import { User } from "../models/User";

export const API_URL = 'http://localhost:5000';

export type GetAllUsers = { users: Array<User> };
export type GetUserById = { user: User | null };
export type CreateUser = { user_id: string };
export type DeleteUserById = GetUserById;

export type UpdateUserDTO = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
};

export type CreateUserDTO = {
  name: string;
  email: string;
  role: string;
}

export const userService = {
  getUsers(): Promise<ServerBaseResponse<GetAllUsers>> {
    return fetch(`${API_URL}/users`).then(a => a.json());
  },
  getUserById(id: string): Promise<ServerBaseResponse<GetUserById>> {
    return fetch(`${API_URL}/users/${id}`).then(a => a.json());
  },
  deleteUserById(id: string): Promise<ServerBaseResponse<DeleteUserById>> {
    return fetch(
      `${API_URL}/users/${id}`, 
      {
        method: 'DELETE'
      }
    ).then(a => a.json());
  },
  updateUser(user: UpdateUserDTO): Promise<ServerBaseResponse<{ message: string }>> {
    return fetch(
      `${API_URL}/users`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }
    ).then(a => a.json());
  },
  createUser(user: CreateUserDTO): Promise<ServerBaseResponse<CreateUser>> {
    return fetch(
      `${API_URL}/users`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }
    ).then(a => a.json());
  }
}
