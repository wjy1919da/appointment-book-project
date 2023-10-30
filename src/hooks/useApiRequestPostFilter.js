import axios from 'axios';
import usePostQueryStore from '../postStore.ts';
import { useInfiniteQuery } from 'react-query';
import Cookies from 'js-cookie';
import APIClient from '../services/api-client';
//const endpoint = 'https://api-dev.charm-life.com/post/posts';

export function useApiRequestPostFilter() {
  const token = Cookies.get('token');
  const postQuery = usePostQueryStore((s) => s.postQuery);
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
  return useInfiniteQuery(['posts', postQuery], fetchUserPostFilterData, {
    staleTime: 1 * 6 * 1000 * 60 * 3,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return undefined;
    },
  });
}
