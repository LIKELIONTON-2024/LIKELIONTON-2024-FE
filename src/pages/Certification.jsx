import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import { COLOR } from "../styles/color";

export default function App() {
  const [location, setLocation] = useState(null);
  const webViewRef = useRef(null);

  useEffect(() => {
    let locationWatchSubscription = null;

    (async () => {
      try {
        // 위치 권한 요청
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        // 현재 위치 가져오기
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        // 위치 정보를 웹뷰로 전송
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({
              type: "LOCATION_UPDATE",
              data: coords,
            })
          );
        }

        // 실시간 위치 업데이트 구독
        locationWatchSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // 5초마다 업데이트
            distanceInterval: 10, // 10미터마다 업데이트
          },
          (newLocation) => {
            setLocation(newLocation.coords);
            if (webViewRef.current) {
              webViewRef.current.postMessage(
                JSON.stringify({
                  type: "LOCATION_UPDATE",
                  data: newLocation.coords,
                })
              );
            }
          }
        );
      } catch (error) {
        console.error("Error getting location:", error);
      }
    })();

    // 컴포넌트 언마운트 시 위치 구독 해제
    return () => {
      if (locationWatchSubscription) {
        locationWatchSubscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <WebView
          ref={webViewRef}
          source={{ uri: "https://kakaomap-vercel.vercel.app/" }}
          style={styles.webView}
          onMessage={(event) =>
            console.log("Message from WebView:", event.nativeEvent.data)
          }
          startInLoadingState={true}
        />
      ) : (
        <ActivityIndicator style={styles.loader} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webView: {
    width: "100%",
    marginTop: 54,
  },
});
