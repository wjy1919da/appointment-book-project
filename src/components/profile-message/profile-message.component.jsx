import "./profile-message.styles.scss";
// import SendBird from "sendbird";
// import { App as SendbirdApp } from "sendbird-uikit";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
// import { SendbirdProvider } from '@sendbird/uikit-react';
import "@sendbird/uikit-react/dist/index.css";
import CustomizedApp from "./profile-message-components/customized-app.component";
const ProfileMessage = () => {
  const APP_ID = "03EB6025-A8DF-44E6-AEBB-09781295279C";
  const USER_ID = "1";

  return (
    <div className="channels-container">
      <SBProvider appId={APP_ID} userId={USER_ID}>
        <CustomizedApp />
      </SBProvider>
    </div>
  );
};

export default ProfileMessage;
