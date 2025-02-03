import { useParams } from 'react-router'

import { Loader, Trash } from 'lucide-react'
import { useDeleteTask, useTask, useUpdateTask } from '../hooks/use-tasks'
import { Button } from '../components/ui/button'
import { TaskForm } from '../components/custom/task-form'

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
 // const navigate = useNavigate()
  const { data: task, isLoading, error } = useTask(Number(id))
  const updateMutation = useUpdateTask()
  const deleteMutation = useDeleteTask()

  if (isLoading) return <Loader className="animate-spin" />
  if (error) return <div>Error loading task</div>
  if (!task) return <div>Task not found</div>

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(task.id)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Task
        </Button>
      </div>

      <TaskForm
        initialData={task}
        onSubmit={(data) => {
          const formattedData = {
            ...data,
            done: data.done ? 1 : 0  // Convert boolean to number
          }
          updateMutation.mutate({ id: task.id, ...formattedData })
        }}
        isSubmitting={updateMutation.isPending}
      />
    </div>
  )
}