export interface Task {
  id: number
  name: string
  description?: string
  done: boolean | number
  createdAt: string
  updatedAt: string
  owner_id: number
}

export type TaskFormData = Pick<Task, 'name' | 'description' | 'done'>

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type LoginFormData = Pick<User, 'username' | 'password'>;

export type RegisterFormData = Pick<User, 'name' | 'username' | 'email' | 'password'>;