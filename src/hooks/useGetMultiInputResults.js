import axios from "axios";

const retrievalUrl = 'http://api-dev.charm-life.com/doctor/search';

export async function retrieveMultiInputResults(filterInputs) {
    const getLocations = async () => {
        try {
            const body = {
                doctor: {...filterInputs, pageSize: 1000}
            };
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
            if (filterArray.length > 0) body.doctor['filterType'] = filterArray;
            console.log('Body submission is: ', body);
            // console.log('Retrieveing location possibilites from: ', retrievalUrl);
            const res = await axios.get(retrievalUrl, body);
            console.log('Res returned as: ', res);
            return res;
        } catch (error) {
            console.log('Error retrieving location possibilities');
        }
    }
    const data = await getLocations();
    // Possibly manipulate data here once I know how data is going to be returned
    return data;
}