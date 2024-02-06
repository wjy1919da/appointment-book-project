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
const ProfileMessage = ({ isConversion, initialChannelUrl }) => {
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  return (
    <div className="channels-container">
      <SBProvider
        key={userInfo?.userId || "1"}
        appId={process.env.APP_ID}
        userId={userInfo?.userId || "1"}
        nickname={userInfo.username || "test_user"}
        accessToken={userInfo?.sendBirdToken}
      >
        {!isConversion && <CustomizedApp />}
        {isConversion && (
          <ProfileMessageConversion initialChannelUrl={initialChannelUrl} />
        )}
      </SBProvider>
    </div>
  );
};

export default ProfileMessage;
