import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    // 구독자 등록
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // Cleanup
    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      let token;
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        setErrorMsg('푸시 알림용 토큰을 가져오지 못했습니다.');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      console.log('푸시 알림 토큰:', token);
      setErrorMsg('');
      return token;
    } catch (error) {
      setErrorMsg(error.message);
      return null;
    }
  };

  return {
    notification,
    errorMsg,
    expoPushToken,
    registerForPushNotificationsAsync,
  };
};

export default useNotification;
