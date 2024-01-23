import "./profile-message-conversion.styles.scss";
import React, { useState, useEffect } from "react";
import SendBird from "sendbird";

import SBConversation from "@sendbird/uikit-react/Channel";
import SBChannelList from "@sendbird/uikit-react/ChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
const ProfileMessageConversion = ({ initialChannelUrl }) => {
  //   console.log("initialChannelUrl", initialChannelUrl, userId, appId);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(
    initialChannelUrl || ""
  );
  useEffect(() => {
    if (initialChannelUrl) {
      setCurrentChannelUrl(initialChannelUrl);
    }
  }, [initialChannelUrl]);

  return (
    <div>
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          {/* <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            onThemeChange={(theme) => {
              alert(`New theme is: ${theme}`);
            }}
          /> */}
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation channelUrl={currentChannelUrl} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMessageConversion;
