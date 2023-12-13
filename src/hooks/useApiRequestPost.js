import { useMutation } from "react-query";
import axios from "axios";
import APIClient from "../services/api-client";

export function useApiRequestPost() {
  //const token = localStorage.getItem('token');
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
    // console.log(brief, title);
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
  return useMutation(fetchUserData);
}
// Edit post
export function useApiRequestEditPost() {
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
  return useMutation(fetchUserData);
}
// set post private
export function useApiRequestSetPostDisplay() {
  const setPostDisplay = async (id) => {
    const apiClient = new APIClient(`/post/posts/${id}/private`);

    const res = await apiClient.post();
    return res.data;
  };

  return useMutation((credentials) => setPostDisplay(credentials.id));
}
// set post public
export function useApiRequestSetPostPublic() {
  const setPostPublic = async (id) => {
    const apiClient = new APIClient(`/post/posts/${id}/remove_private`);
    const res = await apiClient.post();
    return res.data;
  };
  return useMutation((credentials) => setPostPublic(credentials.id));
}

//Delete post
export function useDeletePost() {
  const apiClient = new APIClient("/post");
  const useDeletePost = useMutation(
    async (postId) => {
      const response = await apiClient.delete(postId);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("OK", data);
      },
      onError: (error) => {
        console.error("ERROR", error);
      },
    }
  );
  return useDeletePost;
}
