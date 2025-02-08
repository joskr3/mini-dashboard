// import { useNavigate } from "react-router"

import { TaskForm } from "../components/custom/task-form"
import { withLayout } from "../HOC/withLayout"
import { useCreateTask } from "../hooks/use-tasks"


function NewTaskPage() {
  const createMutation = useCreateTask()

  const handleSubmit = (data: any) => {


    createMutation.mutate({ name: data.title, description: data.description, done: data.done === 'on' ? true : false }, {
      onError: (error) => {
        console.error('Failed to create task:', error)
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <TaskForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
      />
    </div>
  )
}

export default withLayout(NewTaskPage)