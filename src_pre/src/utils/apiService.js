import axios from 'axios';
const base = {
  baseUrl: 'https://run.mocky.io/v3/47bbc07b-9a50-4f04-b34a-aafdb074318c',
  doctorUrl: 'https://run.mocky.io/v3/3b906a79-a2c6-4701-90fd-8167cabf124a'
}

export const searchDoctor = async (params) => {
  const response = await axios.get(base.doctorUrl, { params: params });
  return response.data;
};

export const getProcedures = async (params) => { 
    const response = await axios.get(base.baseUrl, { params: params });
    return response.data;
}

