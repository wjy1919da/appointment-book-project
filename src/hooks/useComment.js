import axios from 'axios';
import { useMutation, useQuery } from "react-query";
import Cookies from 'js-cookie';
import APIClient from '../services/api-client';
const base = {
    addComment: 'http://api-dev.charm-life.com/user_action/actions/comment',
    replyToComment: 'http://api-dev.charm-life.com/user_action/actions/reply',
}

const apiClient = new APIClient('/games');
/* Because dynamicId and text only use once, so I do not create zuztand store */
export function useAddComment() {
    const token = Cookies.get('token');
    const fetchAddComment = async (dynamicId,text) => {
            if (!token) {
                alert('user not login');
            }
            const res = await axios.post(base.addComment, {
                dynamicId,
                text,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    };
    return useMutation((credentials) => fetchAddComment(credentials.dynamicId, credentials.text));
}

