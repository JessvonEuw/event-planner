import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

async function logout(): Promise<void> {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to logout');
  }
}

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Invalidate and remove user data from cache
      queryClient.removeQueries({ queryKey: ['user'] });
      // Redirect to login page
      router.push('/login');
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
  };
} 