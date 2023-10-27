import axios from 'axios';
import { useMutation, useQuery } from "react-query";
import Cookies from 'js-cookie';
import APIClient from '../services/api-client';

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

