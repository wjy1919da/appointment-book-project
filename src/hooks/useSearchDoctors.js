import useDebounce from "./useDebounce";
import axios from 'axios';
import { useState } from "react";
import { useQuery, useQueryClient,useInfiniteQuery } from "react-query";
const base = {
    baseUrl: 'https://run.mocky.io/v3/47bbc07b-9a50-4f04-b34a-aafdb074318c',
    doctorDefaultUrl: 'https://run.mocky.io/v3/4fed0bea-6c05-4f57-9936-deae2f691f16',
    doctorSearchUrl: 'https://run.mocky.io/v3/3bca72f6-9e31-4efc-9fe2-bfe040879a54',
    specializationDefaultUrl: 'https://run.mocky.io/v3/becf0a1c-4279-472f-bd26-eff6cac83223',
    specializationSearchUrl: 'https://run.mocky.io/v3/5206ee0c-7f8e-4e65-9b83-8ff193920ccb',
    locationDefaultUrl: 'https://run.mocky.io/v3/f023b3fd-88bf-4fa8-98c1-9384027c74ab',
    locationSearchUrl: 'https://run.mocky.io/v3/66a8fae6-24b6-43d3-bedc-09904ef1255b',
    multiConditionSearchUrl: `https://run.mocky.io/v3/aec15ab0-97db-4dc3-91c7-5820145b7000`,
    multiConditionPagingUrl:'https://run.mocky.io/v3/2dacdc9f-0fa4-4e4a-bddc-9c1b8ee81efd'
//2dacdc9f-0fa4-4e4a-bddc-9c1b8ee81efd
  }
export function useSearchDoctors(doctorName){
    const debouncedSearchTerm = useDebounce(doctorName, 200);
    const fetchDoctors = () => {
        let url;  
        console.log("useQuery")
        if (doctorName == undefined || debouncedSearchTerm == "" || doctorName == "") {
          console.log("default doctorName")
          url = base.doctorDefaultUrl;   
        }else{
          console.log("search doctorName")
          console.log("params",debouncedSearchTerm)
          url = base.doctorSearchUrl;
        }
        return axios.get(url,
          {
            params: {
                doctor : debouncedSearchTerm
            }
          })
          .then(
            res => {
              console.log('dataInSearchAPI:', res.data);
              return res.data;
            }
          )
    }
    return useQuery({      
        queryKey: ['doctorName', debouncedSearchTerm],
        queryFn: fetchDoctors
    })
};

export function useSearchSpecialization(specialization){
   const debouncedSearchTerm = useDebounce(specialization, 200);
   const fetchProjects = () => {
      let url;
      console.log("SpecializationQuery")
      if (specialization == undefined || debouncedSearchTerm == "" || specialization == "") {
          console.log("default Specialization")
          url = base.specializationDefaultUrl;
      }
      else{
          console.log("search Specialization")
          console.log("params",debouncedSearchTerm)
          url = base.specializationSearchUrl;
      }
      return axios.get(url, 
        {
          params: {
              specialization : debouncedSearchTerm
          }
        })
        .then(
          res => {
            console.log('dataInSearchAPI:', res.data);
            return res.data;
          }
        )
   }
    return useQuery({
        queryKey: ['specialization', debouncedSearchTerm],
        queryFn: fetchProjects 
    });
}
export function useSearchLocation(location){
    const debouncedSearchTerm = useDebounce(location, 200);
    const fetchLocations = () => {
        let url;
        console.log("LocationQuery")
        if (location == undefined || debouncedSearchTerm == "" || location == "") {
            console.log("default Location")
            url = base.locationDefaultUrl;
        }
        else{
            console.log("search Location")
            console.log("params",debouncedSearchTerm)
            url = base.locationSearchUrl;
        }
        return axios.get(url, 
          {
            params: {
                location : debouncedSearchTerm
            }
          })
          .then(
            res => {
              console.log('dataInSearchAPI:', res.data);
              return res.data;
            }
          )
    }
    return useQuery({
        queryKey: ['location', debouncedSearchTerm],
        queryFn: fetchLocations
    });
}
export function useSearchMultiConditions(location, specialization, doctorName){
  const fetchAllCondition = () => {
    console.log("fetching in all condition");
    return axios.get(base.multiConditionPagingUrl, {
      params: {
        location: Array.isArray(location) ? location.join(",") : location !== "all" ? location : undefined, 
        specialization: Array.isArray(specialization) ? specialization.join(",") : specialization !== "all" ? specialization : undefined,
        doctorName: Array.isArray(doctorName) ? doctorName.join(",") : doctorName !== "" ? doctorName : undefined  
      }
    }).then(res => {
      console.log('dataInSearchAPI:', res.data);
      return res.data;
    })
  };
  return useQuery('doctors', fetchAllCondition, { enabled: false });
}


export function useSearchMultiConditionsPopUp(location, specialization, doctorName) {
  const fetchAllCondition = () => {
    return axios.get(base.multiConditionSearchUrl, {
      params: {
        location: location !== "all" ? location : undefined, 
        specialization: specialization !== "all" ? specialization : undefined,
        doctorName: doctorName !== "" ? doctorName : undefined, 
        // page: pageParam
      }
    }).then(res => {
      console.log('dataInSearchAPI:', res.data.pages);
      return res.data;
    });
  };
  return useQuery('doctors', fetchAllCondition, { enabled: false });

  // return useInfiniteQuery('doctors', fetchAllCondition, {
  //   enabled: false,
  //   getNextPageParam: (lastPage, allPages) => {
  //     return lastPage.next ? allPages.length + 1 : undefined;  
  //     }
  //    }
  // );
 


}
