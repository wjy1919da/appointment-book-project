import axios from 'axios';
import { useInfiniteQuery, useQuery} from "react-query";
import useDoctorQueryStore from '../store.ts';
const base = {
  reviewsUrl: 'https://api.charm-life.com/evaluate/evaluations:page',
  aboutUrl: 'https://api.charm-life.com/info/doctor-details',
  infoUrl: 'http://localhost:8080/doctor/search'
  // aboutUrl: 'http://localhost:8080/info/doctor-details'
}
// Reviews
export function useGetDoctorReviews() {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  //console.log("useGetDoctorReviewsDoctorQuery",doctorQuery)
  const clearnickName = doctorQuery.nickName.replace(":", "")
  const fetchDoctorReviews = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.post(
        base.reviewsUrl,
        {
          "currentPage": pageParam,
          "memberId": 56,
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
  console.log("useGetDoctorAbout: ",doctorQuery)
  const clearnickName=doctorQuery.nickName.replace(":", "")
  const fetchDoctorAbout = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.post(
        base.aboutUrl,
        {
          "currentPage": pageParam,
          "memberId": 56,
          "nickname": clearnickName,
          "pageSize": doctorQuery.pageSize,

        }
      );

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

  const fetchDoctorInfo = async () => {
    try {
      const response = await axios.get(`${base.infoUrl}/${doctorQuery.memberId}`);
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
