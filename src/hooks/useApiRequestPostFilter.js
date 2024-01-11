import { useInfiniteQuery, useQuery } from "react-query";
import APIClient from "../services/api-client";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

// stores
import usePostQueryStore from "../postStore";
import useDoctorPostQueryStore from "../store";
import userInfoQueryStore from "../userStore";

export function useApiRequestPostFilter() {
  //const token = localStorage.getItem('token');
  const apiClient = new APIClient("/post/filter");
  const postQuery = usePostQueryStore((s) => s.postQuery);
  const toast = useToast();
  // const [toastCount, setToastCount] = useState(0);

  const fetchPost = async ({ pageParam = 1 }) => {
    var content = [];
    content.push(postQuery.postSearchParam ? postQuery.postSearchParam : "");
    const requestData = {
      categories: postQuery.filterCondition,
      contents: content,
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
      memberIDs: [],
      postBy: postQuery.postBy,
    };
    try {
      const res = await apiClient.post(requestData);
      return { data: res.data.data, pageInfo: res.data.pageInfo };
    } catch (error) {
      throw error;
    }
  };

  return useInfiniteQuery(
    [
      "filterPost",
      postQuery.filterCondition,
      postQuery.postSearchParam,
      postQuery.postBy,
    ],
    fetchPost,
    {
      staleTime: 30000,
      // keepPreviousData: true,
      retry: 2,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.pageInfo) {
          // console.log("lastPage.pageInfo is undefined");
          return undefined;
        }

        const nextPage = lastPage.pageInfo.currentPage + 1;
        const totalPage = lastPage.pageInfo.totalPage;

        return nextPage <= totalPage ? nextPage : undefined;
      },
    }
  );
}

// user doctor post
export function useGetDoctorPost() {
  const apiClient = new APIClient("/post/filter");
  const postQuery = usePostQueryStore((s) => s.postQuery);
  const doctorQuery = useDoctorPostQueryStore((s) => s.doctorQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const requestData = {
      categories: [],
      currentPage: pageParam,
      pageSize: postQuery.DoctorPageSize,
      postBy: ["doctor", "user"],
      memberIDs: [parseInt(doctorQuery.memberId)],
    };

    try {
      const res = await apiClient.post(requestData);
      return { data: res.data.data, pageInfo: res.data.pageInfo };
    } catch (error) {
      throw error;
    }
  };

  return useInfiniteQuery(["doctorPost", doctorQuery.memberId], fetchPost, {
    staleTime: 30000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pageInfo) {
        // console.log("lastPage.pageInfo is undefined");
        return undefined;
      }

      const nextPage = lastPage.pageInfo.currentPage + 1;
      const totalPage = lastPage.pageInfo.totalPage;

      return nextPage <= totalPage ? nextPage : undefined;
    },
  });
}
export function useGetPost() {
  const apiClient = new APIClient("/post/all_posts");
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

  return useInfiniteQuery(["GetAllPosts", postQuery.filterType], fetchPost, {
    staleTime: 30000,
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
  const apiClient = new APIClient("/user_action/Myposts");
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    });
    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  return useInfiniteQuery(
    ["GetPostsPost", postQuery.myPostTrigger],
    fetchPost,
    {
      staleTime: 30000,
      keepPreviousData: true,
      // lastPage is an array of posts
      // allPages is an array of pages
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.pageInfo) {
          // console.log("lastPage.pageInfo is undefined");
          return undefined;
        }

        const nextPage = lastPage.pageInfo.currentPage + 1;
        const totalPage = lastPage.pageInfo.totalPage;

        return nextPage <= totalPage ? nextPage : undefined;
      },
    }
  );
}

export function useGetUserLikededPost() {
  const apiClient = new APIClient("/user_action/likedPosts");
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const res = await apiClient.post({
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
    });

    //console.log("UserLikedPostData", res.data);

    return { data: res.data.data, pageInfo: res.data.pageInfo };
  };

  return useInfiniteQuery(["GetLikesPost"], fetchPost, {
    staleTime: 30000,
    keepPreviousData: true,
    // lastPage is an array of posts
    // allPages is an array of pages
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pageInfo) {
        // console.log("lastPage.pageInfo is undefined");
        return undefined;
      }

      const nextPage = lastPage.pageInfo.currentPage + 1;
      const totalPage = lastPage.pageInfo.totalPage;

      return nextPage <= totalPage ? nextPage : undefined;
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
    ["postDetail", postQuery.postID, postQuery.trigger],
    fetchPostDetail,
    {
      staleTime: 30000,
    }
  );
}
// user get all the highlight posts
export function useGetHighlightPost() {
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  // console.log("userInfo", userInfo);
  const apiClient = new APIClient(`/post/highlight/${userInfo.userId}`);

  const fetchHighlightPost = async () => {
    const res = await apiClient.get();
    return res.data;
  };

  return useQuery("highlightPost", fetchHighlightPost, {
    staleTime: 30000,
  });
}
