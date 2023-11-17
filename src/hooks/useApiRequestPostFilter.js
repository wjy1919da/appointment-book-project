import { useInfiniteQuery } from 'react-query';
import APIClient from '../services/api-client';

// stores
import usePostQueryStore from '../postStore';
import useDoctorPostQueryStore from '../store';
// import axios from 'axios';

//const endpoint = 'https://api-dev.charm-life.com/post/posts';

export function useApiRequestPostFilter() {
  const token = localStorage.getItem('token');
  const apiClient = new APIClient('/post/filter', token);
  const postQuery = usePostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const requestData = {
      categories: postQuery.filterCondition,
      currentPage: pageParam,
      pageSize: postQuery.pageSize,
      postBy: postQuery.postBy,
    };

    try {
      const res = await apiClient.post(requestData);
      return { data: res.data.data, pageInfo: res.data.pageInfo };
    } catch (error) {
      throw error;
    }
  };

  return useInfiniteQuery(['posts', postQuery], fetchPost, {
    staleTime: 1 * 6 * 1000 * 60 * 3,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return undefined;
    },
  });
}

// doctor post
export function useGetDoctorPost() {
  const token = localStorage.getItem('token');
  const apiClient = new APIClient('/post/filter', token);
  const postQuery = usePostQueryStore((s) => s.postQuery);
  const doctorQuery = useDoctorPostQueryStore((s) => s.postQuery);

  const fetchPost = async ({ pageParam = 1 }) => {
    const requestData = {
      categories: [],
      currentPage: pageParam,
      pageSize: postQuery.DoctorPageSize,
      postBy: ['doctor', 'user'],
      memberIDs: doctorQuery.memberId,
    };

    try {
      const res = await apiClient.post(requestData);
      return { data: res.data.data, pageInfo: res.data.pageInfo };
    } catch (error) {
      throw error;
    }
  };

  return useInfiniteQuery(['doctorPost', postQuery], fetchPost, {
    staleTime: 1 * 6 * 1000 * 60 * 3,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return undefined;
    },
  });
}
