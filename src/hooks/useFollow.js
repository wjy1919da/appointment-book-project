import userInfoStore from "../userStore";
import { useQuery } from "react-query";
import axios from 'axios';

const base = {
    followUser: 'http://localhost:8080/user_action/actions/follow',
    unfollowUser: 'http://localhost:8080/user_action/actions/unfollow',
};
/* UserId is the user that you want to follow */
export function useFollowUser(userId) {
    const fetchFollowUser = async () => {
        const res = await axios.post(base.followUser, {
            "userId": userId,
        });
        return res.data;
    }
    return useQuery(['followUser', userId], fetchFollowUser);
}
export function useUnfollowUser(userId) {
    const fetchUnfollowUser = async () => {
        const res = await axios.post(base.unfollowUser, {
            "userId": userId,
        });
        return res.data;
    }
    return useQuery(['unfollowUser', userId], fetchUnfollowUser);
}