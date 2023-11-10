import axios from 'axios';
import { useInfiniteQuery, useQuery} from "react-query";
import useDoctorQueryStore from '../store.ts';
import APIClient from "../services/api-client";

// Reviews
export function useGetDoctorReviews() {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  //console.log("useGetDoctorReviewsDoctorQuery",doctorQuery)
  const clearnickName = doctorQuery.nickName.replace(":", "")
  const apiClient = new APIClient('/evaluate/evaluations:page');
  const fetchDoctorReviews = async ({ pageParam = 1 }) => {
    try {
      const response = await apiClient.post(
        {
          "currentPage": pageParam,
          "memberId": doctorQuery.memberId,
          "nickname": clearnickName,
          "pageSize": doctorQuery.pageSize,
          
        }
      );
      
      //console.log("reviewdata",response.data);
      return { data: response.data, pageInfo: response.data.pageInfo };
    } catch (error) {
      throw new Error('Failed to fetch doctor reviews');
    }
  };

  return useInfiniteQuery(
    ['doctor-reviews', doctorQuery.nickName, doctorQuery.pageSize],
    fetchDoctorReviews,
    {
      staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hours
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length > 0 ? allPages.length + 1 : undefined,
    }
  );
}
// Projects, Counpons, About
export function useGetDoctorAbout() {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  const apiClient = new APIClient(`/info/doctor-details/${doctorQuery.memberId}`);
  //console.log("useGetDoctorAbout: ",doctorQuery)
  //const clearnickName = doctorQuery.nickName.replace(":", "")
  const fetchDoctorAbout = async ({ pageParam = 1 }) => {
    try {
      const response = await apiClient.get()
      //console.log("doctor about data",response.data);
      return { data: response.data.data, pageInfo: response.data.pageInfo };
    } catch (error) {
      throw new Error('Failed to fetch doctor about');
    }
  };
  return useInfiniteQuery(
    ['doctor-about', doctorQuery.nickName, doctorQuery.pageSize],
    fetchDoctorAbout,
    {
      staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hours
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => lastPage.data && lastPage.data.length > 0 ? allPages.length + 1 : undefined,
    }
  );
}
// Get all doctor info
export function useGetDoctorInfo() {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  const apiClient = new APIClient(`/doctor/search/${doctorQuery.memberId}`);
  const fetchDoctorInfo = async () => {
    try {
      const response = await apiClient.get();
      if (response?.data?.code === 100) throw new Error();
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch doctor about");
    }
  };

  return useQuery(["doctor-info", doctorQuery.memberId], fetchDoctorInfo, {
    staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hours
    keepPreviousData: true,
  });
}
