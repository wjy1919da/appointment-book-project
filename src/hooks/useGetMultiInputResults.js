// import axios from "axios";
import APIClient from "../services/api-client";

// const retrievalUrl = 'http://api-dev.charm-life.com/doctor/search';

export async function retrieveMultiInputResults(filterInputs) {
    const DoctorMultiInputResults = async () => {
        try {
            const apiClient = new APIClient('/doctor/search');
            // const body = {
            //     doctor: {...filterInputs, "pageSize": 10, "page": 1 }
            // };
            // console.log('Here in multiinput search');
            const filterArray = [];
            if (filterInputs.address) {
                filterArray.push(1);
            }
            if (filterInputs.name) {
                filterArray.push(2);
            }
            if (filterInputs.nickname) {
                filterArray.push(3);
            }
            // if (filterArray.length > 0) body.doctor['filterType'] = filterArray;
            // console.log('Body submission is: ', body);
            // console.log('Retrieveing location possibilites from: ', retrievalUrl);
            // const res = await axios.get(retrievalUrl, body);
            const res = await apiClient.post(
                {
                  "address": filterInputs?.address,
                  "nickname": filterInputs.nickname,
                  "name": filterInputs.name,
                  "filterType": filterArray,
                  "page": 1,
                  "pageSize": 100
                }
              );
            // console.log('Res returned as: ', res);
            return res;
        } catch (error) {
            console.log('Error retrieving MultiInput results');
        }
    }
    const data = await DoctorMultiInputResults();
    // Possibly manipulate data here once I know how data is going to be returned
    return data;
}