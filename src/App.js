import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    
    function getUrlParams(url) {
      let urlStr = url.split("?")[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      return Object.fromEntries(urlSearchParams.entries());
    }

    // Get roomID from URL or create random
    const roomID =
      getUrlParams(window.location.href)["roomID"] ||
      Math.floor(Math.random() * 10000).toString();

    // Generate random user
    const userID = Math.floor(Math.random() * 10000).toString();
    const userName = "userName" + userID;

    const appID = 1959727034;
    const serverSecret = "a8107994bc88a43108a0987e759357ac";

    // Generate token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,

      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],

      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },

      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,

      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,

      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,

      maxUsers: 50,
      layout: "Sidebar",
      showLayoutButton: true,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    ></div>
  );
}

export default App;
