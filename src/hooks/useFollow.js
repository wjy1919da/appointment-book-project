import userInfoStore from "../userStore";
import { useQuery } from "react-query";
import axios from 'axios';
import APIClient from '../services/api-client.js';


/* UserId is the user that you want to follow */
export function useFollowUser(userId) {
    const apiClient = new APIClient('/user_action/actions/follow');
    const fetchFollowUser = async () => {
        const res = await apiClient.post({
            "userId": userId,
        });
        return res.data;
    }
    return useQuery(['followUser', userId], fetchFollowUser);
}
export function useUnfollowUser(userId) {
    const apiClient = new APIClient('/user_action/actions/unfollow');
    const fetchUnfollowUser = async () => {
        const res = await apiClient.post({
            "userId": userId,
        });
        return res.data;
    }
    return useQuery(['unfollowUser', userId], fetchUnfollowUser);
}