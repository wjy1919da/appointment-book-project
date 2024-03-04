import { useQuery } from "react-query";
import axios from "axios";
import userInfoQueryStore from "../userStore";
import { createUser } from "./useCreateOrRetrieveChannel.js";
// Get or create a user in Sendbird
export function useGetSendbirdUserInfo() {
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const setSendBirdToken = userInfoQueryStore(
    (state) => state.setSendBirdToken
  );
  const apiEndpoint = `https://api-${process.env.REACT_APP_APP_ID}.sendbird.com/v3`;
  const headers = {
    "Api-Token": process.env.REACT_APP_API_TOKEN,
    "Content-Type": "application/json",
  };

  const fetchOrCreateTimeUserInfo = async () => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/users/${userInfo.userId}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const createUserResponse = await createUser({
          userId: userInfo.userId,
          nickname: userInfo.username || "test_user",
        });
        return createUserResponse;
      } else {
        throw error;
      }
    }
  };

  return useQuery(
    ["sendbirdUserInfo", userInfo.userId],
    fetchOrCreateTimeUserInfo,
    {
      onSuccess: (data) => {
        setSendBirdToken(data.access_token);
      },
      enabled: !!userInfo.userId,
    }
  );
}
