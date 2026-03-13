import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const containerRef = useRef(null);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    if (hasJoinedRef.current) return; // prevent double join
    hasJoinedRef.current = true;

    const roomID = "604";
    const userID = Date.now().toString();
    const userName = "User_" + userID;

    const appID = 1959727034;
    const serverSecret = "a8107994bc88a43108a0987e759357ac";

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

      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },

      turnOnCameraWhenJoining: true,
      turnOnMicrophoneWhenJoining: true,

      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,

      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,

      maxUsers: 50,

      layout: "Grid",   // better for multiple users
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
    />
  );
}

export default App;
