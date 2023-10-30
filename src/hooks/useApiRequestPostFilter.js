import axios from 'axios';
import usePostQueryStore from '../postStore.ts';
import { useInfiniteQuery } from 'react-query';
import Cookies from 'js-cookie';

const endpoint = 'https://api-dev.charm-life.com//post/filter';

export function useApiRequestPostFilter() {
  const token = Cookies.get('token');

  const postQuery = usePostQueryStore((s) => s.postQuery);
  console.log(postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const requestData = {
      categories: postQuery.filterCondition,
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
      postBy: postQuery.postBy,
    };

    try {
      const res = await axios.post(endpoint, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
