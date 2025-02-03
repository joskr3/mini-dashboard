import { Link } from 'react-router'

import { Loader, Plus } from 'lucide-react'
import { useTasks } from '../hooks/use-tasks'
import { Button } from '../components/ui/button'
import { withLayout } from '../HOC/withLayout'

function Home() {
  const { data: tasks, isLoading, error } = useTasks()

  if (isLoading) return <Loader className="animate-spin" />
  if (error) return <div>Error loading tasks</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button asChild>
          <Link to="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <Link
              to={`/tasks/${task.id}`}
              className="flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${task.done
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}
              >
                {task.done ? 'Completed' : 'Pending'}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withLayout(Home)