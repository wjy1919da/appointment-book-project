import { useQuery, useInfiniteQuery, useMutation } from 'react-query';
import usePostQueryStore from '../postStore.ts';
import APIClient from '../services/api-client.js';
// import axios from 'axios';

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

  return useInfiniteQuery(['GetAllPosts', postQuery.filterType], fetchPost, {
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
  const apiClient = new APIClient('/user_action/Myposts');
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    });
    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  return useInfiniteQuery(['GetPostsPost'], fetchPost, {
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
  const apiClient = new APIClient('/user_action/likedPosts');
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    });

    //console.log("UserLikedPostData", res.data);

    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  return useInfiniteQuery(['GetLikesPost'], fetchPost, {
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
// Get post details
export function usePostDetail() {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const apiClient = new APIClient(`/post/web/posts/${postQuery.postID}`);
  const fetchPostDetail = async () => {
    try {
      const res = await apiClient.get();
      return res.data;
    } catch (error) {
      return { data: {} };
    }
  };
  return useQuery(
    ['postDetail', postQuery.postID, postQuery.trigger],
    fetchPostDetail,
    {
      placeholderData: { data: {} }, // Default object to use before fetching completes
    }
  );
}

// likes
export function useGetLikesPost() {
  const apiClient = new APIClient('/post/like');
  const fetchName = async (postId) => {
    const res = await apiClient.post({
      postId,
    });
    return res.data;
  };
  return useMutation((credentials) => fetchName(credentials.postId));
}

// like comment
export function useGetCommentLikesPost() {
  const apiClient = new APIClient('/user_action/like_comment');
  const fetchLikeComment = async (commentId) => {
    // console.log('COMMENT ID', commentId);
    const res = await apiClient.post({
      commentId,
    });
    return res.data;
  };
  return useMutation((credentials) => fetchLikeComment(credentials.commentId), {
    onSuccess: (data) => {
      console.log('OK', data);
    },
    onError: (error) => {
      console.error('ERROR', error);
    },
  });
}

// highlight
export function useHighlightPost() {
  const setHighlightPost = async (id) => {
    console.log('ID', id);
    const apiClient = new APIClient(`/post/posts/${id}/highlight`);

    const res = await apiClient.post();
    return res.data;
  };

  return useMutation((credentials) => setHighlightPost(credentials.id), {
    onSuccess: (data) => {
      console.log('OK', data);
    },
    onError: (error) => {
      console.error('ERROR', error);
    },
  });
}

// remove highlight
export function useRemoveHighlightPost() {
  const setRemoveHighlight = async (id) => {
    console.log('ID', id);
    const apiClient = new APIClient(`/post/posts/${id}/remove_highlight`);

    const res = await apiClient.post();
    return res.data;
  };

  return useMutation((credentials) => setRemoveHighlight(credentials.id), {
    onSuccess: (data) => {
      console.log('OK', data);
    },
    onError: (error) => {
      console.error('ERROR', error);
    },
  });
}
