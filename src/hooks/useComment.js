import axios from 'axios';
import { useQuery } from "react-query";

const base = {
    addComment: 'http://localhost:8080/user_action/actions/comment',
    replyToComment: 'http://localhost:8080/user_action/actions/reply',
}
/* Because dynamicId and text only use once, so I do not create zuztand store */
export function useAddComment(dynamicId,text) {
    const fetchAddComment = async () => {
        const res = await axios.post(base.addComment, {
            "dynamicId": dynamicId,
            "text": text,
        });
        return res.data;
    };
    return useQuery(['addComment', dynamicId, text], fetchAddComment, {
        placeholderData: { data: {} }, // Default object to use before fetching completes
    });
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