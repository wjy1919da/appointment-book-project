import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const endpoint = 'https://api-dev.charm-life.com/post/posts';

export function useApiRequestPostFilter() {
  const token = Cookies.get('token');

  const fetchUserPostFilterData = async ({
    categories,
    currentPage,
    pageSize,
    postBy,
  }) => {
    if (!token) {
      alert('Error.');
      return;
    }

    const res = await axios.post(
      endpoint,
      {
        categories,
        currentPage,
        pageSize,
        postBy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };
  return useMutation(fetchUserPostFilterData);
}
