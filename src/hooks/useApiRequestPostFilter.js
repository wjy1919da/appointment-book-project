import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import APIClient from '../services/api-client';

//const endpoint = 'https://api-dev.charm-life.com/post/posts';

export function useApiRequestPostFilter() {
  const token = Cookies.get('token');
  const apiClient = new APIClient('/post/posts', token);
  const fetchUserPostFilterData = async ({
    categories,
    currentPage,
    pageSize,
    postBy,
  }) => {
    if (!token) {
      alert('Error.');
      return;
    }

    const res = await apiClient.post(
      {
        categories,
        currentPage,
        pageSize,
        postBy,
      }
    );
    return res.data;
  };
  return useMutation(fetchUserPostFilterData);
}
