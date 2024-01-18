import "./profile-message.styles.scss";
// import SendBird from "sendbird";
// import { App as SendbirdApp } from "sendbird-uikit";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import React, { useState, useEffect } from "react";
// import { SendbirdProvider } from '@sendbird/uikit-react';
import "@sendbird/uikit-react/dist/index.css";
import CustomizedApp from "./profile-message-components/customized-app.component";
import userInfoQueryStore from "../../userStore";
import ProfileMessageConversion from "./profile-message-components/profile-message-conversion/profile-message-conversion.component";
const ProfileMessage = ({ receiverId, isConversion }) => {
  const [nickname, setNickname] = useState("test_user");
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const APP_ID = "03EB6025-A8DF-44E6-AEBB-09781295279C";
  const USER_ID = userInfo?.userId || "1";
  useEffect(() => {
    if (userInfo?.username) {
      setNickname(userInfo.username);
    }
  }, [userInfo?.username]);
  //   console.log("nickname", nickname);
  const doctorChannelUrl = getChannelUrl(USER_ID, receiverId);
  return (
    <div className="channels-container">
      <SBProvider
        key={nickname}
        appId={APP_ID}
        userId={USER_ID}
        nickname={nickname}
      >
        {!isConversion && <CustomizedApp />}
        {isConversion && (
          <ProfileMessageConversion initialChannelUrl={doctorChannelUrl} />
        )}
      </SBProvider>
    </div>
  );
};

export default ProfileMessage;
