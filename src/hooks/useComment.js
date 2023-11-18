import axios from 'axios';
import { useMutation, useQuery } from "react-query";
import APIClient from '../services/api-client';
export function useAddComment() {
    const apiClient = new APIClient('/user_action/actions/comment');
    const fetchAddComment = async (dynamicId,text) => {
            const res = await apiClient.post({
                dynamicId,
                text,
            },
        );
        return res.data;
    };
    return useMutation((credentials) => fetchAddComment(credentials.dynamicId, credentials.text));
}

