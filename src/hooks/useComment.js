import axios from "axios";
import { useMutation, useQuery } from "react-query";
import APIClient from "../services/api-client";
export function useAddComment() {
  //   console.log("useAddComment");
  const apiClient = new APIClient("/user_action/actions/comment");
  const fetchAddComment = async (dynamicId, text) => {
    const res = await apiClient.post({
      dynamicId,
      text,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchAddComment(credentials.dynamicId, credentials.text)
  );
}

export function useGetCommentLikesPost() {
  const apiClient = new APIClient("/user_action/like_comment");
  const fetchLikeComment = async (commentId) => {
    const res = await apiClient.postForm({
      commentId,
    });
    return res.data;
  };
  return useMutation((credentials) => fetchLikeComment(credentials.commentId), {
    onSuccess: (data) => {
      console.log("OK", data);
    },
    onError: (error) => {
      console.error("ERROR", error);
    },
  });
}
export function useRplyComment() {
  const apiClient = new APIClient("/user_action/actions/reply");
  const fetchRplyComment = async (commentId, text) => {
    const res = await apiClient.post({
      commentId,
      text,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    fetchRplyComment(credentials.commentId, credentials.text)
  );
}
