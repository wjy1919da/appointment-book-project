import { useMutation } from "react-query";
import APIClient from "../services/api-client";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import usePostQueryStore from "../postStore";

// Create post
export function useApiRequestPost() {
  const toast = useToast();
  const navigate = useNavigate();
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const apiClient = new APIClient("/post/posts");
  const fetchUserData = async ({
    address,
    brief,
    coverImg,
    id,
    isDisplay,
    lat,
    location,
    lon,
    pictures,
    tags,
    title,
  }) => {
    const res = await apiClient.post({
      address,
      brief,
      coverImg,
      id,
      isDisplay,
      lat,
      location,
      lon,
      pictures,
      tags,
      title,
    });
    return res.data;
  };
  return useMutation(fetchUserData, {
    onSuccess: () => {
      toast({
        title: "Create post success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refreshMyPost();
      localStorage.getItem("accountType") === "2"
        ? navigate("/doctorProfile/#Posts")
        : navigate("/userProfile");
    },
    onError: (error) => {
      toast({
        title: "Failed to create post",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
// Edit post
export function useApiRequestEditPost() {
  const toast = useToast();
  const navigate = useNavigate();
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const apiClient = new APIClient("/post/edit_posts");
  const fetchUserData = async ({
    address,
    brief,
    coverImg,
    id,
    isDisplay,
    lat,
    location,
    lon,
    pictures,
    tags,
    title,
  }) => {
    const res = await apiClient.post({
      address,
      brief,
      coverImg,
      id,
      isDisplay,
      lat,
      location,
      lon,
      pictures,
      tags,
      title,
    });
    return res.data;
  };
  return useMutation(fetchUserData, {
    onSuccess: () => {
      toast({
        title: "Edit post success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refreshMyPost();
      localStorage.getItem("accountType") === "2"
        ? navigate("/doctorProfile/#Posts")
        : navigate("/userProfile");
    },
    onError: (error) => {
      toast({
        title: "Failed to Edit post",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}

export function useDeletePost() {
  const toast = useToast();
  const apiClient = new APIClient("/post");
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const navigate = useNavigate();
  const useDeletePost = useMutation(
    async (postId) => {
      // console.log("POSTID", postId);
      const response = await apiClient.delete(postId);
      return response.data;
    },
    {
      onSuccess: (data) => {
        // console.log("OK", data);
        toast({
          title: "Delete success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refreshMyPost();
        localStorage.getItem("accountType") === "2"
          ? navigate("/doctorProfile/#Posts")
          : navigate("/userProfile");
      },
      onError: (error) => {
        // console.error("ERROR", error);
        toast({
          title: "Delete failed",
          description: error.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );
  return useDeletePost;
}
