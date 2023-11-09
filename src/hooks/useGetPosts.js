import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';
import usePostQueryStore from '../postStore.ts';
import APIClient from '../services/api-client.js';

export function useGetPost() {
  const apiClient = new APIClient('/post/all_posts');
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
      filterType: postQuery.filterType,
    });

    //console.log("userIDdata", res.data);

    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  return useInfiniteQuery(['GetAllPosts', postQuery], fetchPost, {
    staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hour
    keepPreviousData: true,
    // lastPage is an array of posts
    // allPages is an array of pages
    getNextPageParam: (lastPage, allPages) => {
      // hasNextPage
      //console.log("lastPage data",lastPage.pageInfo)
      //return lastPage.pageInfo.totalPage > lastPage.pageInfo.currentPage ? allPages.length + 1 : undefined;
      return undefined;
    },
  });
}

// get posts
export function useGetUserPostedPost() {
  //console.log("DOI Call this hook?");
  //const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTciLCJleHAiOjE2OTYxMjE2MDcsImlhdCI6MTY5NjAzNTIwN30.W0w8HIyrtYUknJyeGC-ijTcEOZnQCtFbKPFmclO-s6I";
  const token = localStorage.getItem('token');
  const apiClient = new APIClient('/user_action/Myposts', token);
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    });

     if (!token) {
      alert('user not login');
      return {};
    }

    // console.log(res);

    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  return useInfiniteQuery(['GetPostsPost', postQuery], fetchPost, {
    staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hour
    keepPreviousData: true,
    // lastPage is an array of posts
    // allPages is an array of pages
    getNextPageParam: (lastPage, allPages) => {
      // hasNextPage
      //console.log("lastPage data",lastPage.pageInfo)
      //return lastPage.pageInfo.totalPage > lastPage.pageInfo.currentPage ? allPages.length + 1 : undefined;
      return undefined;
    },
  });
}

export function useGetUserLikededPost() {
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTciLCJleHAiOjE2OTYxMjE2MDcsImlhdCI6MTY5NjAzNTIwN30.W0w8HIyrtYUknJyeGC-ijTcEOZnQCtFbKPFmclO-s6I";
  const token = localStorage.getItem('token');
  const apiClient = new APIClient('/user_action/likedPosts', token);
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    if (!token) {
      alert('user not login');
      //return undefined;
      return {};
    }

    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    });

    //console.log("UserLikedPostData", res.data);

    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  return useInfiniteQuery(['GetLikesPost', postQuery], fetchPost, {
    staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hour
    keepPreviousData: true,
    // lastPage is an array of posts
    // allPages is an array of pages
    getNextPageParam: (lastPage, allPages) => {
      // hasNextPage
      //console.log("lastPage data",lastPage.pageInfo)
      //return lastPage.pageInfo.totalPage > lastPage.pageInfo.currentPage ? allPages.length + 1 : undefined;
      return undefined;
    },
  });
}

export function usePostDetail() {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const apiClient = new APIClient(`/post/web/posts/${postQuery.userID}`);

  //console.log("postQuery.trigger", postQuery.trigger);

  const fetchPostDetail = async () => {
    //let url = `${base.postDetailUrl}${postQuery.userID}`;
    try {
      const res = await apiClient.get();
      return res.data;
    } catch (error) {
      return { data: {} };
    }
  };
  
  return useQuery(
    ['postDetail', postQuery.userID, postQuery.trigger],
    fetchPostDetail,
    {
      placeholderData: { data: {} }, // Default object to use before fetching completes
    }
  );
}
