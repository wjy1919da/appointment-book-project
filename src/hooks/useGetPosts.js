import axios from 'axios';
import { useQuery, useInfiniteQuery} from "react-query";
import usePostQueryStore from "../postStore.ts";

const base = {
  postUrl: 'http://api.charm-life.com/post/posts:page',
  postDetailUrl: 'http://api.charm-life.com/post/web/posts/'
}

export function useGetPost() {
    const postQuery = usePostQueryStore(s => s.postQuery);
    const fetchPost = async ({ pageParam = 1 }) => {
      const res = await axios.post(base.postUrl, {
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
        return lastPage.pageInfo.totalPage > lastPage.pageInfo.currentPage ? allPages.length + 1 : undefined;
      }
     }   
    );
}

export function usePostDetail() {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  console.log("postQuery",postQuery);
  
  const fetchPostDetail = async () => {
    let url = `${base.postDetailUrl}${postQuery.userID}`;
    console.log('Before axios.get');
    console.log('url:', url);
    try {
      const res = await axios.get(url);
      console.log('Inside axios.get success');
      console.log("userIDdata", res.data);
      return res.data;
    } catch (error) {
      console.log('Inside axios.get error');
      console.error("Failed to fetch procedures", error);
      return { data: {} };
    }

  };

  return useQuery(['postDetail', postQuery.userID], fetchPostDetail, {
    placeholderData: { data: {} }, // Default object to use before fetching completes
  });
}