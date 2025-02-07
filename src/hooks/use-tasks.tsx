import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { Task, TaskFormData } from '../lib/types';

const API_URL = import.meta.env.VITE_API_URL as string;

export function useTasks() {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/tasks`);
            if (!response.ok) throw new Error('Error fetching tasks');
            return response.json();
        }
    });
}

export function useTask(id: number) {
    return useQuery<Task>({
        queryKey: ['task', id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/tasks/${id}`);
            if (!response.ok) throw new Error('Error fetching task');
            return response.json();
        }
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (taskData: TaskFormData) => {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) throw new Error('Error creating task');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            navigate(`/`);
        }
    });
}

export function useUpdateTask() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    return useMutation({
        mutationFn: async ({ id, ...taskData }: Partial<Task>) => {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) throw new Error('Error updating task');
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['task', data.id] });
            navigate('/');
        }
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error deleting task');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            navigate('/');
        }
    });
}

export function useToggleTaskCompletion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
            const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });
            if (!response.ok) throw new Error('Error updating task completion');
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['task', data.id] });
        }
    });
}
