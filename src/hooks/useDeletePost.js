import { useMutation } from 'react-query';
import APIClient from '../services/api-client';

export function useDeletePost() {
  const apiClient = new APIClient('/post/{id}');

  const useDeletePost = useMutation(
    async (postId) => {
      const response = await apiClient.delete(postId);
      return response.data; 
    },
    {
      onSuccess: (data) => {
        console.log('DELETE request succeeded:', data);
      },
      onError: (error) => {
        console.error('DELETE request failed:', error);
      },
    }
  );

  return useDeletePost;
}
