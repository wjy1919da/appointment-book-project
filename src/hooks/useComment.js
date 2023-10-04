import axios from 'axios';
import { useMutation, useQuery } from "react-query";
import Cookies from 'js-cookie';
import userInfoQueryStore from '../userStore.ts';
const base = {
    addComment: 'http://localhost:8080/user_action/actions/comment',
    replyToComment: 'http://localhost:8080/user_action/actions/reply',
}
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

export function useReplyToComment(commentId,text) {
    const fetchReplyToComment = async () => {
        const res = await axios.post(base.replyToComment, {
            "commentId": commentId,
            "text": text,
        });
        return res.data;
    };
    return useQuery(['replyToComment', commentId, text], fetchReplyToComment, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
}