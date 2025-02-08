import { useParams } from 'react-router'

import { Loader, Trash } from 'lucide-react'
import { useDeleteTask, useTask, useUpdateTask } from '../hooks/use-tasks'
import { Button } from '../components/ui/button'
import { TaskForm } from '../components/custom/task-form'
import { withLayout } from '../HOC/withLayout'

function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  // const navigate = useNavigate()
  const { data: task, isLoading, error } = useTask(Number(id))
  const updateMutation = useUpdateTask()
  const deleteMutation = useDeleteTask()

  if (isLoading) return <Loader className="animate-spin" />
  if (error) return <div>Error loading task</div>
  if (!task) return <div>Task not found</div>

  const handleToggleDone = () => {
    updateMutation.mutate({
      id: task.id,
      done: task.done ? 0 : 1
    })
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(task.id)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold truncate max-w-[200px] sm:max-w-none">
          {task.name}
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleToggleDone}
            disabled={updateMutation.isPending}
            className="w-full sm:w-auto"
          >
            {task.done ? 'Mark as Pending' : 'Mark as Done'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="w-full sm:w-auto"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Task
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-4">
        <TaskForm
          initialData={task}
          onSubmit={(data) => {
            const formattedData = {
              ...data,
              done: data.done ? 1 : 0
            }
            updateMutation.mutate({ id: task.id, ...formattedData })
          }}
          isSubmitting={updateMutation.isPending}
        />
      </div>
    </div>
  )
}

export default withLayout(TaskDetail)