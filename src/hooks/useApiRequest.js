import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const endpoint = 'https://api-dev.charm-life.com/post/posts';

export function useApiRequest() {
  const token = Cookies.get('token');

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

    const res = await axios.post(
      endpoint,
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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };
  return useMutation(fetchUserData);
}
