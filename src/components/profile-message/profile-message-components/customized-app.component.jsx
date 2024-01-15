// import React, { useState } from "react";

// import { ChannelList, Channel, ChannelSettings } from "@sendbird/uikit-react";
// import "./customized-app.styles.scss";
// const CustomizedApp = () => {
//   const [currentChannel, setCurrentChannel] = useState(null);
//   const currentChannelUrl = currentChannel?.url || "";
//   const [showSettings, setShowSettings] = useState(false);

//   return (
//     <div className="channel-wrap">
//       <div className={`channel-list ${showSettings ? "narrow" : ""}`}>
//         <ChannelList
//           onChannelSelect={(channel) => {
//             setCurrentChannel(channel);
//           }}
//         />
//       </div>
//       <div className={`channel-chat ${showSettings ? "expanded" : ""}`}>
//         <Channel
//           channelUrl={currentChannelUrl}
//           onChatHeaderActionClick={() => {
//             setShowSettings(!showSettings);
//           }}
//         />
//       </div>
//       {showSettings && (
//         <div className="channel-setting">
//           <ChannelSettings
//             channelUrl={currentChannelUrl}
//             onCloseClick={() => {
//               setShowSettings(false);
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomizedApp;
import React, { useState } from "react";

import SBConversation from "@sendbird/uikit-react/Channel";
import SBChannelList from "@sendbird/uikit-react/ChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";

export default function CustomizedApp() {
  // useState
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
      </div>
      {showSettings && (
        <div className="sendbird-app__settingspanel-wrap">
          <SBChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
