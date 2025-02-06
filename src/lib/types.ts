export interface Task {
  id: number
  title: string
  description?: string
  done: boolean | number
  createdAt: string
  updatedAt: string
  owner_id: number
}

export interface Task {
  id: number
  title: string
  description?: string
  done: boolean | number
  createdAt: string
  updatedAt: string
}

export interface User {
  id?: number
  name? : string
  username? : string
  email? : string
  password?: string
  createdAt?: string
  updatedAt?: string
}

export type TaskFormData = Pick<Task, 'title' | 'description' | 'done'>
export type SignupFormData = Pick<User,'name' | 'username | email | password'>