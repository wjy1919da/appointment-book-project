import axios from 'axios';
import { useInfiniteQuery } from "react-query";
import usePostQueryStore from "../postStore.ts";

export function useGetPost() {
    const postQuery = usePostQueryStore(s => s.postQuery);
    const fetchPost = async ({ pageParam = 1 }) => {
      const res = await axios.post('http://api.charm-life.com/post/posts:page', {
        currentPage: pageParam,
        pageSize: postQuery.pageSize,
        filterType: postQuery.filterType,
      });
      return { data: res.data.data, pageInfo: res.data.pageInfo };
    };
    return useInfiniteQuery(
     ['posts', postQuery], 
     fetchPost, {
      staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hour
      keepPreviousData: true,
      // lastPage is an array of posts
      // allPages is an array of pages
      getNextPageParam: (lastPage, allPages) => {
        // hasNextPage
        //console.log("lastPage data",lastPage.pageInfo)
        return lastPage.data.length > 0 ? allPages.length + 1 : undefined; 
      }
     }   
    );
}