import axios from 'axios';
import { useQuery } from "react-query";
import useInstrumentQueryStore from "../instrumentStore.ts";  // Make sure this path is correct.
import APIClient from '../services/api-client.js';

// const base = {
//     instrumentUrl: 'https://api.charm-life.com/procedure/instruments',
//    // instrumentUrl: 'http://localhost:8080/procedure/instruments',
//     // ... other URLs
// }


export  function useGetInstruments() {
    const instrumentQuery = useInstrumentQueryStore(s => s.instrumentQuery);
    const { instruName } = instrumentQuery;  // Assuming instruName is a property of the query.
    const apiClient = new APIClient('/procedure/instruments');
    const fetchInstruments = async () => {
     // let url = `${base.instrumentUrl}`;
      try {
        const res = await apiClient.get({
          instruName: instruName,
        });
        //console.log("userInstrumentData", res.data);
        return res.data;
      } catch (error) {
        //console.error("Failed to fetch instruments", error);
        return { data: {} };
      }
    }
  
    return useQuery(['instruments', instruName], fetchInstruments, {
      placeholderData: { data: {} },
      cacheTime: 1000,
    });
}