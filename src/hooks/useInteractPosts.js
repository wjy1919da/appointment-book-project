import { useQuery, useInfiniteQuery, useMutation } from "react-query";
import usePostQueryStore from "../postStore.ts";
import APIClient from "../services/api-client.js";
import userInfoQueryStore from "../userStore.ts";
import { useToast } from "@chakra-ui/react";

// user like post
export function useGetLikesPost() {
  const toast = useToast();
  const apiClient = new APIClient("/post/like");

  const fetchLikeData = async (postId) => {
    const res = await apiClient.post({
      postId,
    });
    return res.data;
  };

  return useMutation((credentials) => fetchLikeData(credentials.postId), {
    onSuccess: (data) => {
      console.log("OK", data);
    },
    onError: (error) => {
      console.error("ERROR", error);
    },
  });
}

// user like comment
export function useGetCommentLikesPost() {
  const toast = useToast();
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

// user highlight post
export function useHighlightPost() {
  const toast = useToast();
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const setHighlightPost = async (id) => {
    // console.log("ID", id);
    const apiClient = new APIClient(`/post/posts/${id}/highlight`);

    const res = await apiClient.post();
    return res.data;
  };

  return useMutation((credentials) => setHighlightPost(credentials.id), {
    onSuccess: (data) => {
      console.log("OK", data);
      refreshMyPost();
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
}

// remove highlight
export function useRemoveHighlightPost() {
  const toast = useToast();
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const setRemoveHighlight = async (id) => {
    const apiClient = new APIClient(`/post/posts/${id}/remove_highlight`);

    const res = await apiClient.post();
    return res.data;
  };

  return useMutation((credentials) => setRemoveHighlight(credentials.id), {
    onSuccess: (data) => {
      console.log("OK", data);
      refreshMyPost();
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
}
// set post private
export function useApiRequestSetPostDisplay() {
  const toast = useToast();
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const setPostDisplay = async (id) => {
    const apiClient = new APIClient(`/post/posts/${id}/private`);

    const res = await apiClient.post();
    return res.data;
  };

  return useMutation((credentials) => setPostDisplay(credentials.id), {
    onSuccess: (data) => {
      console.log("OK", data);
      refreshMyPost();
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
}
// set post public
export function useApiRequestSetPostPublic() {
  const toast = useToast();
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const setPostPublic = async (id) => {
    const apiClient = new APIClient(`/post/posts/${id}/remove_private`);
    const res = await apiClient.post();
    return res.data;
  };
  return useMutation((credentials) => setPostPublic(credentials.id), {
    onSuccess: (data) => {
      console.log("OK", data);
      refreshMyPost();
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
}
