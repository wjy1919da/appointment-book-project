import useDebounce from "./useDebounce";
import axios from 'axios';
import { useQuery, useInfiniteQuery} from "react-query";
import useDoctorQueryStore from '../store.ts';

const base = {

}


export function useSearchLocation(){
    const location = useDoctorQueryStore(s => s.doctorQuery.location);
    //console.log("useSearchLocation",location)
    const debouncedSearchTerm = useDebounce(location, 700);
    const fetchLocations = async () => {
      let url;
     // console.log("LocationQuery");
      if (!location || !debouncedSearchTerm) {
          //console.log("default Location");
          url = base.locationDefaultUrl;
      } else {
         // console.log("search Location");
         // console.log("params", debouncedSearchTerm);
          url = base.locationSearchUrl;
      }
      const res = await axios.get(url,
        {
          params: {
            location: debouncedSearchTerm || ''
          }
        });
      //console.log('dataInSearchAPI:', res.data);
      return res.data;
  }
    return useQuery({
        queryKey: ['location', debouncedSearchTerm],
        queryFn: fetchLocations
    });
}

// search doctor part
export function useSearchMultiConditionsPopUp() {
  const doctorQuery = useDoctorQueryStore(s => s.doctorQuery);
  const fetchDoctors = async ({pageParam = 1}) => {
      let filterType = []; 
      if (doctorQuery.location !== "") filterType.push(1);
      if (doctorQuery.field !== "") filterType.push(2);
      if (doctorQuery.doctorName !== "") filterType.push(3);
     const res = await axios.post('https://api-dev.charm-life.com/doctor/search',
      //const res = await axios.post('http://localhost:8080/doctor/search',
      {
        "address": doctorQuery.location,
        "nickname": doctorQuery.doctorName,
        "name": doctorQuery.field,
        "filterType": filterType,
        "page": pageParam,
        "pageSize": doctorQuery.pageSize
      }
    );
    return { data: res.data.data || [], pageInfo: res.data.pageInfo };
  }

  return useInfiniteQuery(
    ['doctors', doctorQuery],
     fetchDoctors,
     {
        staleTime: 1 * 6 * 1000 * 60 * 3, // 3 hour
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
        return lastPage.data && lastPage.data.length > 0 ? allPages.length + 1 : undefined; 
      } 
    }
  )
}