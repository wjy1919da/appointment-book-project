import axios from 'axios';
import usePostQueryStore from '../postStore.ts';
import { useInfiniteQuery } from 'react-query';
import Cookies from 'js-cookie';
import APIClient from '../services/api-client';
//const endpoint = 'https://api-dev.charm-life.com/post/posts';

export function useApiRequestPostFilter() {
  const token = Cookies.get('token');
  const apiClient = new APIClient('/post/filter', token);
  const postQuery = usePostQueryStore((s) => s.postQuery);
  const fetchPost = async ({ pageParam = 1 }) => {
    const requestData = {
      categories: postQuery.filterCondition,
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
      postBy: postQuery.postBy,
    };
    try {
      const res = await apiClient.post(requestData);
      return { data: res.data.data, pageInfo: res.data.pageInfo };
    } catch (error) {
      throw error;
    }
  };
  return useInfiniteQuery(['posts', postQuery], fetchPost, {
    staleTime: 1 * 6 * 1000 * 60 * 3,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return undefined;
    },
  });
}
