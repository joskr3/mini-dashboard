// import { useNavigate } from "react-router"

import { TaskForm } from "../components/custom/task-form"
import { withLayout } from "../HOC/withLayout"
import { useCreateTask } from "../hooks/use-tasks"

function NewTaskPage() {
  const createMutation = useCreateTask()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <TaskForm
        onSubmit={createMutation.mutate}
        isSubmitting={createMutation.isPending}
      />
    </div>
  )
}

export default withLayout(NewTaskPage)