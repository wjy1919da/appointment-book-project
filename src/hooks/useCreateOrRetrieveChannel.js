import { useMutation } from "react-query";
import axios from "axios";
import userInfoQueryStore from "../userStore";
const headers = {
  "Api-Token": process.env.REACT_APP_API_TOKEN,
  "Content-Type": "application/json",
};
const apiEndpoint = `https://api-${process.env.REACT_APP_APP_ID}.sendbird.com/v3`;

export async function checkUserExists(apiEndpoint, headers, userId) {
  try {
    const response = await axios.get(`${apiEndpoint}/users/${userId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 404)
    ) {
      return null;
    }
    throw error;
  }
}
export async function createUser({ userId, nickname }) {
  const body = {
    user_id: userId,
    nickname: nickname || "test_user",
    profile_url: "https://sendbird.com/main/img/profiles/profile_05_512px.png",
    issue_access_token: true,
    metadata: {
      font_preference: "times new roman",
      font_color: "black",
    },
  };
  const response = await axios.post(`${apiEndpoint}/users`, body, {
    headers,
  });
  return response.data;
}
export function useCreateOrRetrieveChannel() {
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const checkChannelMessages = async (channelUrl) => {
    const response = await axios.get(
      `${apiEndpoint}/group_channels/${channelUrl}/messages/total_count`,
      { headers }
    );
    return response.data.total === 0;
  };

  const sendMessage = async (channelUrl, message) => {
    const messageBody = {
      message_type: "ADMM",
      message: message,
    };

    const response = await axios.post(
      `${apiEndpoint}/group_channels/${channelUrl}/messages`,
      messageBody,
      { headers }
    );
    return response.data;
  };

  // Function to create or retrieve a channel
  const createOrRetrieveChannel = async ({ receiverId, nickName }) => {
    // console.log("createOrRetrieveChannel", receiverId, nickName);
    // Check if receiverId corresponds to an existing user
    const userExists = await checkUserExists(apiEndpoint, headers, receiverId);

    // If the user does not exist, create the user
    if (!userExists) {
      await createUser({ userId: receiverId, nickname: nickName });
    }

    // Proceed to create the channel
    const channelBody = {
      is_distinct: true,
      user_ids: [userInfo.userId, receiverId],
      operator_ids: [userInfo.userId],
    };
    const channelResponse = await axios.post(
      `${apiEndpoint}/group_channels`,
      channelBody,
      { headers }
    );
    if (channelResponse.data) {
      const channelUrl = channelResponse.data.channel_url;

      // Check if the channel has no messages
      const isChannelEmpty = await checkChannelMessages(channelUrl);
      if (isChannelEmpty) {
        await sendMessage(channelUrl, "Start your conversation", receiverId);
      }
    }
    return channelResponse.data;
  };

  return useMutation(createOrRetrieveChannel);
}