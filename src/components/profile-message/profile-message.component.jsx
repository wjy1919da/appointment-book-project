import "./profile-message.styles.scss";
// import SendBird from "sendbird";
// import { App as SendbirdApp } from "sendbird-uikit";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import React, { useState, useEffect } from "react";
// import { SendbirdProvider } from '@sendbird/uikit-react';

import "@sendbird/uikit-react/dist/index.css";
//src/hooks/useCreateOrRetrieveChannel.js
import CustomizedApp from "./profile-message-components/customized-app.component";
import userInfoQueryStore from "../../userStore";
import useDoctorQueryStore from "../../store.ts";

import ProfileMessageConversion from "./profile-message-components/profile-message-conversion/profile-message-conversion.component";
const ProfileMessage = ({ receiverId, isConversion, initialChannelUrl }) => {
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  // console.log("doctorQuery", doctorQuery);
  const [nickname, setNickname] = useState("test_user");
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const APP_ID = "CF591544-6DFA-4B6B-8995-B90E6F1DB033";
  const USER_ID = userInfo?.userId || "1";
  useEffect(() => {
    if (userInfo?.username) {
      setNickname(userInfo.username);
    }
  }, [userInfo?.username]);

  // console.log("channelData", channelData, isConversion);
  // 控制打开时间
  // accessToken
  return (
    <div className="channels-container">
      <SBProvider
        key={nickname}
        appId={APP_ID}
        userId={USER_ID}
        nickname={nickname}
        accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjozMTIyOTY0NjEsInYiOjEsImUiOjE3MDUwMzg5OTR9.ZZRtnw5XCwBw9N5Wq8tnAoLhqhFlz-0FD906V6mCoHQ"
      >
        {!isConversion && <CustomizedApp />}
        {isConversion && (
          <ProfileMessageConversion
            // initialChannelUrl={channelData.channel_url}
            initialChannelUrl={initialChannelUrl}
          />
        )}
      </SBProvider>
    </div>
  );
};

export default ProfileMessage;
