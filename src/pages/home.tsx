import { Link } from 'react-router'
import { Check, Clock, Loader, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { useTasks } from '../hooks/use-tasks'
import { Button } from '../components/ui/button'
import { withLayout } from '../HOC/withLayout'
import { cn } from '../lib/utils'
import { useState } from 'react'

function Home() {
  const { data: tasks, isLoading, error } = useTasks()
  const [expandedTasks, setExpandedTasks] = useState<number[]>([])

  const toggleExpand = (taskId: number) => {
    setExpandedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId)
      }
      return [...prev, taskId]
    })
  }

  const isTaskExpanded = (taskId: number, isDone: number) => {
    return Number(isDone) === 0 || expandedTasks.includes(taskId)
  }

  const sortedTasks = tasks?.sort((a, b) => {
    if (a.done !== b.done) {
      return a.done ? 1 : -1
    }
    return b.id - a.id
  })

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
        {sortedTasks?.map((task) => (
          <div
            key={task.id}
            className={cn(
              "p-4 border rounded-lg hover:bg-accent transition-all",
              Number(task.done) === 1 && "opacity-60 backdrop-blur-sm bg-opacity-80"
            )}
          >
            <div className="flex justify-between items-start gap-4">
              <Link
                to={`/tasks/${task.id}`}
                className={cn(
                  "flex-1",
                  !isTaskExpanded(task.id, Number(task.done)) && "overflow-hidden"
                )}
              >
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className={cn(
                    "text-sm text-muted-foreground transition-all",
                    !isTaskExpanded(task.id, Number(task.done)) ? "line-clamp-1" : "line-clamp-none"
                  )}>
                    {task.description}
                  </p>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                    Number(task.done) === 1
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  )}
                >
                  {Number(task.done) === 1 ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {Number(task.done) === 1 ? "Completed" : "Pending"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleExpand(task.id)
                  }}
                >
                  {isTaskExpanded(task.id, Number(task.done)) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withLayout(Home)