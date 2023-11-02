import axios from 'axios';
import { useQuery } from "react-query";
import useProcedureQueryStore from "../procedureStore.ts";
import APIClient from '../services/api-client.js';

export function useGetProcedureCategories(){
    const apiClient = new APIClient('/procedure');
    const fetchProcedureCategories = async () => {
      const res = await apiClient.get();
    //  console.log("fetch Data:", res.data);
      return res.data;
    };
    return useQuery('procedureCategories', fetchProcedureCategories);
}

export default function useGetProcedures() {
    const procedureQuery = useProcedureQueryStore(s => s.procedureQuery);
    var processedCategory;
    const fetchProcedures = async () => {
      // Replace all '-' with '_'
      processedCategory = procedureQuery.categories.replace(/-/g, "_");
      const apiClient = new APIClient(`/procedure/${processedCategory}`);
      // use default pageSize
      // no page info 
      try {
        const res = await apiClient.get(
          {
            page: 1,
          }
        );
       // console.log("procedure", res.data);
        return res.data;
      } catch (error) {
        //console.error("Failed to fetch procedures", error);
        return { data: {} };
      }
    }
    return useQuery(['procedures', procedureQuery.categories], fetchProcedures, {
      placeholderData: { data: {} }, // default object to use before fetching completes
      cacheTime: 1000, // 1 second
    });
}

export function useGetFAQ() {
    const procedureQuery = useProcedureQueryStore(s => s.procedureQuery);
    const apiClient = new APIClient(`/faq/${procedureQuery.categoryId}`);
    //console.log("useGetFAQ",procedureQuery.categoryId)
    const fetchFAQ = async () => {
      const res = await apiClient.get();
      //console.log("fetch Data:", res.data);
      return res.data;
    };
    return useQuery(['faq',procedureQuery.categoryId], fetchFAQ);
}