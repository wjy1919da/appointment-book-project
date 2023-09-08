import useDebounce from "./useDebounce";
import axios from 'axios';
import { useQuery, useInfiniteQuery} from "react-query";
import useDoctorQueryStore from '../store.ts';

const base = {
  doctorDefaultUrl: 'https://run.mocky.io/v3/4fed0bea-6c05-4f57-9936-deae2f691f16',
  doctorSearchUrl: 'https://run.mocky.io/v3/3bca72f6-9e31-4efc-9fe2-bfe040879a54',
  specializationDefaultUrl: 'https://run.mocky.io/v3/becf0a1c-4279-472f-bd26-eff6cac83223',
  specializationSearchUrl: 'https://run.mocky.io/v3/5206ee0c-7f8e-4e65-9b83-8ff193920ccb',
  // location default 先保留
  locationDefaultUrl: 'https://run.mocky.io/v3/f023b3fd-88bf-4fa8-98c1-9384027c74ab',
  locationSearchUrl: 'https://run.mocky.io/v3/66a8fae6-24b6-43d3-bedc-09904ef1255b',
  multiConditionSearchUrl: `https://run.mocky.io/v3/aec15ab0-97db-4dc3-91c7-5820145b7000`,
  multiConditionPagingUrl:'https://run.mocky.io/v3/2dacdc9f-0fa4-4e4a-bddc-9c1b8ee81efd',
}

export function useSearchDoctors(doctorName){
    const debouncedSearchTerm = useDebounce(doctorName, 200);
    const fetchDoctors = async () => {
        let url;  
        console.log("useQuery")
        if (doctorName === undefined || debouncedSearchTerm === "" || doctorName === "") {
          console.log("default doctorName")
          url = base.doctorDefaultUrl;   
        }else{
          console.log("search doctorName")
          console.log("params",debouncedSearchTerm)
          url = base.doctorSearchUrl;
        }
        const res = await axios.get(url,
        {
          params: {
            doctor: debouncedSearchTerm
          }
        });
      console.log('dataInSearchAPI:', res.data);
      return res.data;
    }
    return useQuery({      
        queryKey: ['doctorName', debouncedSearchTerm],
        queryFn: fetchDoctors
    })
};

export function useSearchSpecialization(specialization){
   const debouncedSearchTerm = useDebounce(specialization, 200);
   const fetchProjects = async () => {
      let url;
      console.log("SpecializationQuery")
      if (specialization === undefined || debouncedSearchTerm === "" || specialization === "") {
          console.log("default Specialization")
          url = base.specializationDefaultUrl;
      }
      else{
          console.log("search Specialization")
          console.log("params",debouncedSearchTerm)
          url = base.specializationSearchUrl;
      }
      const res = await axios.get(url,
       {
         params: {
           specialization: debouncedSearchTerm
         }
       });
     console.log('dataInSearchAPI:', res.data);
     return res.data;
   }
    return useQuery({
        queryKey: ['specialization', debouncedSearchTerm],
        queryFn: fetchProjects 
    });
}

export function useSearchLocation(){
    const location = useDoctorQueryStore(s => s.doctorQuery.location);
    console.log("useSearchLocation",location)
    const debouncedSearchTerm = useDebounce(location, 700);
    const fetchLocations = async () => {
      let url;
      console.log("LocationQuery");
      if (!location || !debouncedSearchTerm) {
          console.log("default Location");
          url = base.locationDefaultUrl;
      } else {
          console.log("search Location");
          console.log("params", debouncedSearchTerm);
          url = base.locationSearchUrl;
      }
      const res = await axios.get(url,
        {
          params: {
            location: debouncedSearchTerm || ''
          }
        });
      console.log('dataInSearchAPI:', res.data);
      return res.data;
  }
    return useQuery({
        queryKey: ['location', debouncedSearchTerm],
        queryFn: fetchLocations
    });
}

export function useSearchMultiConditions(location, specialization, doctorName){
  const fetchAllCondition = async () => {
    console.log("fetching in all condition");
    const res = await axios.get(base.multiConditionPagingUrl, {
      params: {
        location: Array.isArray(location) ? location.join(",") : location !== "all" ? location : undefined,
        specialization: Array.isArray(specialization) ? specialization.join(",") : specialization !== "all" ? specialization : undefined,
        doctorName: Array.isArray(doctorName) ? doctorName.join(",") : doctorName !== "" ? doctorName : undefined
      }
    });
    console.log('dataInSearchAPI:', res.data);
    return res.data;
  };
  return useQuery('doctors', fetchAllCondition, { enabled: false });
}

// search doctor part
export function useSearchMultiConditionsPopUp() {
  const doctorQuery = useDoctorQueryStore(s => s.doctorQuery);

  const fetchDoctors = async ({pageParam = 1}) => {
      let filterType = []; 
      if (doctorQuery.location !== "") filterType.push(1);
      if (doctorQuery.field !== "") filterType.push(2);
      if (doctorQuery.doctorName !== "") filterType.push(3);

      //const res = await axios.post('https://api.charm-life.com/doctor/search',
      const res = await axios.post('http://localhost:8080/doctor/search',
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