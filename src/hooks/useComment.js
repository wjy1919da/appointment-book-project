import axios from 'axios';
import { useMutation, useQuery } from "react-query";
import APIClient from '../services/api-client';
import userInfoQueryStore from '../userStore.ts';
/* Because dynamicId and text only use once, so I do not create zuztand store */
export function useAddComment() {
    const token = localStorage.getItem('token');
    const apiClient = new APIClient('/user_action/actions/comment', token);
    const fetchAddComment = async (dynamicId,text) => {
            if (!token) {
                alert('user not login');
            }
            const res = await apiClient.post({
                dynamicId,
                text,
            },
        );
        return res.data;
    };
    return useMutation((credentials) => fetchAddComment(credentials.dynamicId, credentials.text));
}

