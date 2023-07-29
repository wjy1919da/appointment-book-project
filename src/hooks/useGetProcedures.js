import axios from 'axios';
import { useQuery } from "react-query";
import useProcedureQueryStore from "../procedureStore.ts";

const base = {
    procedureUrl:'https://api.charm-life.com/procedure',
    procedureCategoriesUrl:'https://api.charm-life.com/procedure',
    faqUrl:'https://api.charm-life.com/faq'
}

export function useGetProcedureCategories(){
    const fetchProcedureCategories = async () => {
      const res = await axios.get(base.procedureCategoriesUrl);
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
      let url = `${base.procedureUrl}/${processedCategory}`;
  
      // use default pageSize
      // no page info 
      try {
        const res = await axios.get(url, {
          params: {
            page: 1,
          }
        });
        return res.data;
      } catch (error) {
        console.error("Failed to fetch procedures", error);
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
    console.log("useGetFAQ",procedureQuery.categoryId)
    const fetchFAQ = async () => {
      const res = await axios.get(`${base.faqUrl}/${procedureQuery.categoryId}`);
      console.log("fetch Data:", res.data);
      return res.data;
    };
    return useQuery(['faq',procedureQuery.categoryId], fetchFAQ);
}