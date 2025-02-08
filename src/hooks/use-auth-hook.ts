import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { LoginFormData, RegisterFormData, User } from '../lib/types';

const API_URL = import.meta.env.VITE_API_URL as string;

interface AuthResponse {
  access_token: string;
  token_type: string;
}

// User Query Hook
export function useUser() {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No user found');

      const response = await fetch(`${API_URL}/me`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'accept': 'application/json'
        },
      });

      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired');
      }

      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    },
    retry: false,
  });
}

// Login Mutation Hook
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ username, password }: LoginFormData) => {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('grant_type', 'password');

      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Login failed');
      }

      const authResponse: AuthResponse = await response.json();
      localStorage.setItem('token', authResponse.access_token);

      // Fetch user data after successful login
      const userResponse = await fetch(`${API_URL}/me`, {
        headers: { 
          Authorization: `Bearer ${authResponse.access_token}`,
          'accept': 'application/json'
        },
      });

      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
}

// Signup Mutation Hook
export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      // First register the user
      const registerResponse = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!registerResponse.ok) {
        const errorMessage = await registerResponse.text();
        throw new Error(errorMessage || 'Signup failed');
      }

      // After successful registration, perform login
      const formData = new URLSearchParams();
      formData.append('username', data.username);
      formData.append('password', data.password);

      const loginResponse = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
        body: formData
      });

      if (!loginResponse.ok) {
        throw new Error('Registration successful but login failed');
      }

      const authResponse: AuthResponse = await loginResponse.json();
      localStorage.setItem('token', authResponse.access_token);

      // Fetch user data
      const userResponse = await fetch(`${API_URL}/me`, {
        headers: { 
          Authorization: `Bearer ${authResponse.access_token}`,
          'accept': 'application/json'
        },
      });

      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      navigate('/');
    },
    onError: (error) => {
      console.error('Register error:', error);
    },
  });
}
// Logout Mutation Hook
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/login');
    },
  });
}

// Combined Auth Hook
export function useAuth() {
  const { data: user } = useUser();
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();

  return {
    user,
    login: (username: string, password: string) => login.mutateAsync({ username, password }),
    signup: (data: RegisterFormData) => signup.mutateAsync(data),
    logout: () => logout.mutateAsync(),
    isLoading: login.isPending || signup.isPending,
    isError: login.isError || signup.isError,
  };
}