import { useInfiniteQuery } from "react-query";
import APIClient from "../services/api-client";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

// stores
import usePostQueryStore from "../postStore";
import useDoctorPostQueryStore from "../store";

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
      // staleTime: 1 * 6 * 1000 * 60 * 3,
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
    staleTime: 1 * 6 * 1000 * 60 * 3,
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
