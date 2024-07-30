import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let subscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const injectedJavaScript = location
    ? `window.postMessage(JSON.stringify({
        action: "update_location",
        latitude: ${location.coords.latitude},
        longitude: ${location.coords.longitude}
      }), "*"); true;`
    : "";

  const handleMessage = (event) => {
    console.log("Received message from webview:", event.nativeEvent.data);

    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.action === "location_received") {
        if (data.status === "success") {
          console.log("Location data successfully received by web page.");
        } else {
          console.error("Failed to receive location data on web page.");
        }
      }
    } catch (e) {
      console.error("Failed to parse message data:", e);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.mapContainer}
        source={{ uri: "https://kakaomap-vercel.vercel.app/" }}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mapContainer: {
    flex: 1,
    marginTop: 54,
  },
});
