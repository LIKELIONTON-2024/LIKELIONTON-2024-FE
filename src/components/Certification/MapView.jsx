
import React, { forwardRef } from "react";
import { WebView } from "react-native-webview";

const MapView = forwardRef(({ onMessage }, ref) => (
  <WebView
    ref={ref}
    source={{ uri: "https://kakaomap-vercel.vercel.app/" }}
    style={{ marginTop: 54, width: "100%" }}
    onMessage={onMessage}
    startInLoadingState={true}
  />
));

export default MapView;
