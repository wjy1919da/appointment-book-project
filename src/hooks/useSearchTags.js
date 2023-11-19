import { useQuery } from 'react-query';
import usePostQueryStore from '../postStore.ts';
import APIClient from '../services/api-client.js';
import useDebounce from './useDebounce.js';

export function useSearchTags() {
  const apiClient = new APIClient('/post/fuzzySearchTags');
  const postQuery = usePostQueryStore((s) => s.postQuery);
  const debouncedSearchTerm = useDebounce(postQuery.tag, 300);

  const fetchTags = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: 4,
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
