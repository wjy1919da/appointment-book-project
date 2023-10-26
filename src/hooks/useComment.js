import axios from 'axios';
import { useMutation, useQuery } from "react-query";
import Cookies from 'js-cookie';
import APIClient from '../services/api-client';
// const base = {
//     addComment: 'http://api-dev.charm-life.com/user_action/actions/comment',
//     replyToComment: 'http://api-dev.charm-life.com/user_action/actions/reply',
// }

const apiClient = new APIClient('/user_action/actions/comment', Cookies.get('token'));
/* Because dynamicId and text only use once, so I do not create zuztand store */
export function useAddComment() {
  const fetchAddComment = async ({ dynamicId, text }) => {
    if (!apiClient.token) {
      alert('User not logged in');
      throw new Error('User not logged in');
    }
    return apiClient.post({ dynamicId, text });
  };

  return useMutation(fetchAddComment);
}

