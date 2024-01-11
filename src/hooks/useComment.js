import axios from "axios";
import { useMutation, useQuery } from "react-query";
import APIClient from "../services/api-client";
import { useToast } from "@chakra-ui/react";
import usePostQueryStore from "../postStore";

export function useAddComment() {
  const apiClient = new APIClient("/user_action/actions/comment");
  const refresh = usePostQueryStore((state) => state.refresh);
  const toast = useToast();
  const fetchAddComment = async (dynamicId, text) => {
    const response = await apiClient.post({
      dynamicId,
      text,
    });
  };
  return useMutation(
    (credentials) => fetchAddComment(credentials.dynamicId, credentials.text),
    {
      onSuccess: (data) => {
        toast({
          title: "Comment success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refresh();
      },
      onError: (error) => {
        toast({
          title: "Failed to comment",
          description: error.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
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
  const toast = useToast();
  const refresh = usePostQueryStore((state) => state.refresh);
  const apiClient = new APIClient("/user_action/actions/reply");
  const fetchRplyComment = async (commentId, text) => {
    const response = await apiClient.post({
      commentId,
      text,
    });
    return response.data;
  };
  return useMutation(
    (credentials) => fetchRplyComment(credentials.commentId, credentials.text),
    {
      onSuccess: (data) => {
        toast({
          title: "Reply success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refresh();
      },
      onError: (error) => {
        toast({
          title: "Failed to reply",
          description: error.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );
}
