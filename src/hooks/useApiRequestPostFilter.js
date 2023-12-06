import { useInfiniteQuery } from "react-query";
import APIClient from "../services/api-client";

// stores
import usePostQueryStore from "../postStore";
import useDoctorPostQueryStore from "../store";

export function useApiRequestPostFilter() {
  //const token = localStorage.getItem('token');
  const apiClient = new APIClient("/post/filter");
  const postQuery = usePostQueryStore((s) => s.postQuery);

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
    ["filterPost", postQuery.filterCondition, postQuery.postSearchParam],
    fetchPost,
    {
      // staleTime: 1 * 6 * 1000 * 60 * 3,
      // keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return undefined;
      },
    }
  );
}

// user doctor post
export function useGetDoctorPost() {
  const token = localStorage.getItem("token");
  const apiClient = new APIClient("/post/filter", token);
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
      return undefined;
    },
  });
}
