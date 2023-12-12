import { useMutation } from 'react-query';
import APIClient from '../services/api-client';

const useDeletePost = () => {
  const apiClient = new APIClient('/post/{id}');

  const deleteData = async (id) => {
    try {
      const res = await apiClient.delete(id);
      console.log(res); 
      return res.data;
    } catch (error) {
      throw new Error('DID NOT DELETE');
    }
  };

return useMutation(deleteData);
  // const mutation = useMutation(deleteData);
  // return mutation;
};

export default useDeletePost;
