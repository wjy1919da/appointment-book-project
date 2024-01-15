import React from "react";
import "./profile-message.styles.scss";
import SendBird from "sendbird";
import { App as SendbirdApp } from "sendbird-uikit";

const ProfileMessage = () => {
  const APP_ID = "03EB6025-A8DF-44E6-AEBB-09781295279C";
  //   const USER_ID = "sendbird_desk_agent_id_594ea664-7672-4440-8fb0-ebfec3bed432";
  //   const APP_ID = "a622c1d4-19a8-4991-bbbf-04242ed70259";
  const USER_ID = "1";

  return (
    <div className="channels-container">
      <SendbirdApp appId={APP_ID} userId={USER_ID} />
    </div>
  );
};

export default ProfileMessage;
