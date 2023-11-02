import axios from 'axios';

const baseUrl = 'https://api-dev.charm-life.com/procedure/detailedInstruments/';

export function GetDetailedInstruments(instrumentName) {
    const fetchInstruments = async () => {
      let url = baseUrl + instrumentName;
      try {
        const res = await axios.get(url);
        console.log("Detailed Data is: ", res.data);
        return res.data;
      } catch (error) {
        console.error("Failed to fetch instruments", error);
        return { data: {} };
      }
    }
    return fetchInstruments();
  
    };
