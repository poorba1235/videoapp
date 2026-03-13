import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const roomID = "604";
    const userID = Math.floor(Math.random() * 10000) + "";
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

    // Ensure container is ready
    if (containerRef.current) {
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Join Room 604",
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
        layout: "Sidebar", // Use Sidebar for stable layout
        showLayoutButton: true, // Let users switch layout if needed
      });
    }

    console.log("Joining room:", roomID);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
      ref={containerRef}
    ></div>
  );
}

export default App;
