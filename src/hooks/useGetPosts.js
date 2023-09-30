import axios from 'axios';
import { useQuery, useInfiniteQuery} from "react-query";
import usePostQueryStore from "../postStore.ts";
import Cookies from 'js-cookie';
const base = {
  postUrl: 'https://api.charm-life.com/post/posts:page',
  // postUrl:'http://localhost:8080/post/posts:page',
  postDetailUrl: 'https://api.charm-life.com/post/web/posts/',
  usePostedPostUrl:'http://localhost:8080/user_action/Myposts',
  useLikedPostUrl:'http://localhost:8080/user_action/likedPosts'
}

export function useGetPost() {
    const postQuery = usePostQueryStore(s => s.postQuery);
    const fetchPost = async ({ pageParam = 1 }) => {
      const res = await axios.post(base.postUrl, {
        currentPage: pageParam,
        pageSize: postQuery.pageSize,
        filterType: postQuery.filterType,
      });
      //console.log("userIDdata", res.data);
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
        //return lastPage.pageInfo.totalPage > lastPage.pageInfo.currentPage ? allPages.length + 1 : undefined;
        return undefined;
      }
     }   
    );
}
export function useGetUserPostedPost() {
  console.log("DOI Call this hook?");
  const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTciLCJleHAiOjE2OTYxMjE2MDcsImlhdCI6MTY5NjAzNTIwN30.W0w8HIyrtYUknJyeGC-ijTcEOZnQCtFbKPFmclO-s6I";
  const postQuery = usePostQueryStore(s => s.postQuery);
  const fetchPost = async ({ pageParam = 1 }) => {
    console.log("DOI Call this hook2?");
    if (!token) {
      alert('user not login');
    } 
    const res = await axios.post(base.usePostedPostUrl, {
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    },
    {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }
    );
    console.log("DOI Call this hook1?", res.data);
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
      //return lastPage.pageInfo.totalPage > lastPage.pageInfo.currentPage ? allPages.length + 1 : undefined;
      return undefined;
    }
   }   
  );
}
export function useGetUserLikededPost() {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTciLCJleHAiOjE2OTYxMjE2MDcsImlhdCI6MTY5NjAzNTIwN30.W0w8HIyrtYUknJyeGC-ijTcEOZnQCtFbKPFmclO-s6I";
  const postQuery = usePostQueryStore(s => s.postQuery);
  const fetchPost = async ({ pageParam = 1 }) => {
    if (!token) {
      alert('user not login');
    } 
    const res = await axios.post(base.useLikedPostUrl, {
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    },
    {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }
    );
    console.log("UserLikedPostData", res.data);
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
      //return lastPage.pageInfo.totalPage > lastPage.pageInfo.currentPage ? allPages.length + 1 : undefined;
      return undefined;
    }
   }   
  );
}


export function usePostDetail() {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  //console.log("postQuery.trigger", postQuery.trigger);
  const fetchPostDetail = async () => {
    let url = `${base.postDetailUrl}${postQuery.userID}`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return { data: {} };
    }

  };
  return useQuery(['postDetail', postQuery.userID,postQuery.trigger], fetchPostDetail, {
    placeholderData: { data: {} }, // Default object to use before fetching completes
  });
}