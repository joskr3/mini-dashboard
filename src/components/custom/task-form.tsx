
import { useForm } from 'react-hook-form'
import { TaskFormData } from '../../lib/types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'


interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  initialData?: Partial<TaskFormData>
  isSubmitting?: boolean
}

export function TaskForm({ onSubmit, initialData, isSubmitting }: TaskFormProps) {
  const { register, handleSubmit } = useForm<TaskFormData>({
    defaultValues: initialData
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          {...register('name', { required: true })}
          placeholder="Task title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          {...register('description')}
          placeholder="Task description"
          rows={4}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="done"
          {...register('done')}
        />
        <label htmlFor="done" className="text-sm font-medium">
          Completed
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Task'}
      </Button>
    </form>
  )
}
