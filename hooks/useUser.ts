import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

async function fetchCurrentUser(): Promise<User> {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  return response.json();
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  });
} 