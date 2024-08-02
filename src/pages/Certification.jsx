import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import MapView from "../components/Certification/MapView";
import CertificationModal from "../components/Certification/CertificationModal";
import NoMapView from "../components/Certification/NoMapView";
import { COLOR } from "../styles/color";
import { getDistance } from "../utils/distanceUtils";

export default ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mapVisible, setMapVisible] = useState(true);
  const [certified, setCertified] = useState(false);
  const webViewRef = useRef(null);

  const spots = [
    {
      userId: 4,
      spotId: 13,
      name: "화양동느티나무",
      latitude: 37.5464290217723,
      longitude: 127.072005790412,
    },
    {
      userId: 4,
      spotId: 14,
      name: "세븐일레븐 화양리점",
      latitude: 37.5474139697658,
      longitude: 127.070250476163,
    },
    {
      userId: 4,
      spotId: 15,
      name: "어린이대공원역 7호선",
      latitude: 37.54796087622509,
      longitude: 127.07465525507352,
    },
  ];

  useEffect(() => {
    let locationWatchSubscription = null;

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({
              type: "LOCATION_UPDATE",
              data: {
                currentLocation: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                },
                spots: spots,
              },
            })
          );
        }

        locationWatchSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation(newLocation.coords);
            if (webViewRef.current) {
              webViewRef.current.postMessage(
                JSON.stringify({
                  type: "LOCATION_UPDATE",
                  data: {
                    currentLocation: {
                      latitude: newLocation.coords.latitude,
                      longitude: newLocation.coords.longitude,
                    },
                    spots: spots,
                  },
                })
              );
            }
          }
        );
      } catch (error) {
        console.error("Error getting location:", error);
      }
    })();

    return () => {
      if (locationWatchSubscription) {
        locationWatchSubscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (certified) {
      setMapVisible(false);
    }
  }, [certified]);

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("Message received from WebView:", data);
      if (data && data.type === "SELECT_SPOT") {
        const spotId = data.data.id;
        const spot = spots.find((s) => s.spotId === spotId);
        if (spot) {
          setSelectedSpot(spot);
          setModalVisible(true);
          setErrorMessage(null);
        }
      }
    } catch (error) {
      console.error("Error parsing message from WebView:", error);
    }
  };

  const handleVerify = () => {
    if (location && selectedSpot) {
      const distance = getDistance(
        location.latitude,
        location.longitude,
        selectedSpot.latitude,
        selectedSpot.longitude
      );

      if (distance <= 10) {
        setModalVisible(false);
        setCertified(true);
        navigation.navigate("VerifyComplete");
      } else {
        setErrorMessage("거리가 멀어서 인증할 수 없습니다.");
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setErrorMessage(null);
  };

  return (
    <View style={styles.container}>
      {mapVisible ? (
        <MapView ref={webViewRef} onMessage={handleWebViewMessage} />
      ) : (
        <NoMapView />
      )}
      <CertificationModal
        visible={modalVisible}
        onClose={handleCloseModal}
        spot={selectedSpot}
        errorMessage={errorMessage}
        onVerify={handleVerify}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});
