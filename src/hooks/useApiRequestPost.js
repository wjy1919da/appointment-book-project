import { useMutation } from 'react-query';
import axios from 'axios';
import APIClient from '../services/api-client';

export function useApiRequestPost() {
  //const token = localStorage.getItem('token');
  const apiClient = new APIClient('/post/posts');
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
    console.log(brief, title);
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
  const apiClient = new APIClient('/post/edit_posts');
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
    postId,
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
      postId,
    });
    return res.data;
  };
  return useMutation(fetchUserData);
}
// set post display(private/public)
export function useApiRequestSetPostDisplay() {
  const apiClient = new APIClient('/post/edit_posts');
  const setPostDisplay = async (id, isDisplay) => {
    const res = await apiClient.post({
      id,
      isDisplay,
    });
    return res.data;
  };
  return useMutation((credentials) =>
    setPostDisplay(credentials.id, credentials.isDisplay)
  );
}
