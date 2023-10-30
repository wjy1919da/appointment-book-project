import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import APIClient from '../services/api-client';

//const endpoint = 'https://api-dev.charm-life.com/post/posts';

export function useApiRequest() {
  const token = Cookies.get('token');
  const apiClient = new APIClient('/post/posts', token);
  const fetchUserData = async ({
    address,
    brief,
    coverImg,
    id,
    isDisplay,
    lat,
    location,
    lon,
    pictures,
    tags,
    title,
  }) => {
    if (!token) {
      alert('Error.');
      return;
    }
    console.log(brief, title);
    const res = await apiClient.post(
      {
        address,
        brief,
        coverImg,
        id,
        isDisplay,
        lat,
        location,
        lon,
        pictures,
        tags,
        title,
      },
    );
    return res.data;
  };
  return useMutation(fetchUserData);
}
