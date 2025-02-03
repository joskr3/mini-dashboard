export interface Task {
    id: number
    title: string
    description?: string
    done: boolean|number
    createdAt: string
    updatedAt: string
  }
  
  export type TaskFormData = Pick<Task, 'title' | 'description' | 'done'>