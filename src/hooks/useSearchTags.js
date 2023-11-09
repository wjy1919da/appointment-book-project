import { useQuery } from 'react-query';
import usePostQueryStore from '../postStore.ts';
import APIClient from '../services/api-client.js';
import useDebounce from './useDebounce.js';

export function useSearchTags() {
  const token = localStorage.getItem('token');
  const apiClient = new APIClient('/post/fuzzySearchTags', token);
  const postQuery = usePostQueryStore((s) => s.postQuery);
  const debouncedSearchTerm = useDebounce(postQuery, 300);

  const fetchTags = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
      tag: postQuery.tag,
    });
    console.log('APIレスポンス:', res);
    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  // return useQuery({
  //   queryKey: ['tags', debouncedSearchTerm],
  //   queryFn: fetchTags,
  // });
  
  return useQuery(['tags', debouncedSearchTerm], fetchTags, {
    // placeholderData: { data: {} },
    cacheTime: 1000,
  });
}

export default useSearchTags;
