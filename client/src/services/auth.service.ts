import { apiRequest, ApiError } from '../lib/apiClient';

import type { User, LoginCredentials, RegisterData } from '../types/auth.types';

interface AuthResponse {
  success: boolean;
  user: User;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiRequest<AuthResponse>('/auth/me');

    return response.user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }

    throw error;
  }
}

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  const response = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: credentials,
  });

  return response.user;
}

export async function registerUser(data: RegisterData): Promise<User> {
  const response = await apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: data,
  });

  return response.user;
}

export async function logoutUser(): Promise<void> {
  await apiRequest('/auth/logout', {
    method: 'POST',
  });
}
