import "./profile-message.styles.scss";
// import SendBird from "sendbird";
// import { App as SendbirdApp } from "sendbird-uikit";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import React, { useState, useEffect } from "react";
// import { SendbirdProvider } from '@sendbird/uikit-react';
import { useCreateOrRetrieveChannel } from "../../hooks/useCreateOrRetrieveChannel.js";
import "@sendbird/uikit-react/dist/index.css";
//src/hooks/useCreateOrRetrieveChannel.js
import CustomizedApp from "./profile-message-components/customized-app.component";
import userInfoQueryStore from "../../userStore";
import useDoctorQueryStore from "../../store.ts";
import ProfileMessageCustomInput from "./profile-message-components/profile-message-conversion/profile-message-custom-input";

import ProfileMessageConversion from "./profile-message-components/profile-message-conversion/profile-message-conversion.component";
const ProfileMessage = ({ receiverId, isConversion }) => {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  // console.log("doctorQuery", doctorQuery);
  const [nickname, setNickname] = useState("test_user");
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const APP_ID = "03EB6025-A8DF-44E6-AEBB-09781295279C";
  const USER_ID = userInfo?.userId || "1";
  useEffect(() => {
    if (userInfo?.username) {
      setNickname(userInfo.username);
    }
  }, [userInfo?.username]);

  const { mutate: createOrRetrieveChannel, data: channelData } =
    useCreateOrRetrieveChannel(APP_ID, USER_ID);
  useEffect(() => {
    if (isConversion && receiverId && doctorQuery.nickName) {
      createOrRetrieveChannel(receiverId, doctorQuery.nickName);
    }
  }, [isConversion, receiverId, doctorQuery.nickName]);
  // if (channelData) {
  //   console.log("channelData", channelData.channel_url);
  // }

  return (
    <div className="channels-container">
      <SBProvider
        key={nickname}
        appId={APP_ID}
        userId={USER_ID}
        nickname={nickname}
      >
        {!isConversion && <CustomizedApp />}
        {isConversion && (channelData?.channel_url ?? null) && (
          <ProfileMessageConversion
            initialChannelUrl={channelData.channel_url}
          />
        )}
      </SBProvider>
    </div>
  );
};

export default ProfileMessage;
