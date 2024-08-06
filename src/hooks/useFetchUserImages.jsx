import { useState, useEffect } from "react";
import { BaseURL } from "../apis/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useFetchUserImages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("로그인 정보가 없습니다.");
        }

        const response = await axios.get(`${BaseURL}/user/image`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchUserImages;
