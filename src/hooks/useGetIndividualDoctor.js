import axios from 'axios';
import { useInfiniteQuery} from "react-query";
import useDoctorQueryStore from '../store.ts';

const base = {
  reviewsUrl: 'http://api.charm-life.com/evaluate/evaluations:page',
  aboutUrl: 'http://api.charm-life.com/info/doctor-details'
}

export function useGetDoctorReviews() {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  console.log(doctorQuery)
  const clearnickName=doctorQuery.nickName.replace(":", "")
  const fetchDoctorReviews = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.post(
        base.reviewsUrl,
        {
          "currentPage": pageParam,
          "memberId": 45,
          "nickname": clearnickName,
          "pageSize": doctorQuery.pageSize,
          
        }
      );
      
      console.log("reviewdata",response.data);
      return { data: response.data.data, pageInfo: response.data.pageInfo };
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

//TODO: need data to test
export function useGetDoctorAbout() {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  console.log(doctorQuery)
  const clearnickName=doctorQuery.nickName.replace(":", "")
  const fetchDoctorReviews = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.post(
        base.aboutUrl,
        {
          "currentPage": pageParam,
          "memberId": 45,
          "nickname": clearnickName,
          "pageSize": doctorQuery.pageSize,

        }
      );

      console.log("doctor about data",response.data);
      return { data: response.data.data, pageInfo: response.data.pageInfo };
    } catch (error) {
      throw new Error('Failed to fetch doctor about');
    }
  };

  return useInfiniteQuery(
    ['doctor-about', doctorQuery.nickName, doctorQuery.pageSize],
    fetchDoctorReviews,
    {
      staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hours
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length > 0 ? allPages.length + 1 : undefined,
    }
  );
}