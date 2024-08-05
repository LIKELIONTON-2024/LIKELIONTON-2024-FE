import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import MapView from "../components/Certification/MapView";
import NoMapView from "../components/Certification/NoMapView";
import CertificationModal from "../components/Certification/CertificationModal";
import CustomToast from "../components/Certification/CustomToast";
import { COLOR } from "../styles/color";
import { getDistance } from "../utils/distanceUtils";
import { BaseURL } from "../apis/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mapVisible, setMapVisible] = useState(true);
  const [certified, setCertified] = useState(false);
  const [spots, setSpots] = useState([]);
  const [hasCertifiedToday, setHasCertifiedToday] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const webViewRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("로그인 정보가 없습니다.");
        }

        const response = await axios.get(`${BaseURL}/user/my`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const today = new Date().toISOString().split("T")[0];
        const visitDays = response.data.visitDays || [];

        const visitDates = visitDays.map(
          (dateTime) => new Date(dateTime).toISOString().split("T")[0]
        );

        setHasCertifiedToday(visitDates.includes(today));

        // 주석 처리하여 NoMapView 조건부 렌더링 비활성화
        if (visitDates.includes(today)) {
          setMapVisible(true); // 카메라 모달 고치면 false로!
          fetchSpots(); // 이것도 없애고
        } else {
          fetchSpots();
        }
      } catch (error) {
        console.error("프로필 정보를 가져오는 데 실패했습니다:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchSpots = async () => {
    try {
      console.log("Fetching spots...");

      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("로그인 정보가 없습니다.");
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      console.log("Current location:", coords);

      const response = await axios.get(`${BaseURL}/spot/recommend`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      });

      console.log("Spots fetched:", response.data);
      setSpots(response.data);
    } catch (error) {
      console.error("스팟 목록을 가져오는 데 실패했습니다:", error.message);
    }
  };

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
  }, [spots]);

  useEffect(() => {
    if (certified) {
      setMapVisible(true); // false로 수정해야힘 : 인증했으면 NoMapView로 막기
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

      console.log("Distance to selected spot:", distance);

      if (distance <= 10) {
        setModalVisible(false);
        setCertified(true);
        navigation.navigate("VerifyComplete", { spotId: selectedSpot.spotId });
      } else {
        setToastMessage("거리가 너무 멀어요! 10m 내에서 찍어주세요.");
        setToastVisible(true);
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
      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
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
