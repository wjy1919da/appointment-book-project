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
  //   useEffect(() => {
  //     const sb = new SendBird({ appId: appId });
  //     const channelUrl = initialChannelUrl; // 您希望打开的特定 channel URL

  //     sb.connect(userId, (user, error) => {
  //       if (error) {
  //         console.error("SendBird Connection Failed:", error);
  //         return;
  //       }

  //       sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
  //         if (error) {
  //           console.error("Error retrieving channel:", error);
  //           return;
  //         }

  //         // 更新当前 channel URL，以便 SBConversation 可以显示它
  //         setCurrentChannelUrl(channel.url);
  //       });
  //     });

  //     return () => {
  //       sb.disconnect(); // 断开连接
  //     };
  //   }, [appId, userId, initialChannelUrl]); // 确保包含所有必要的依赖项

  return (
    <div>
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            onThemeChange={(theme) => {
              alert(`New theme is: ${theme}`);
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation channelUrl={currentChannelUrl} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMessageConversion;
