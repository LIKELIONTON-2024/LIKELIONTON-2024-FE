import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { COLOR } from "../styles/color";

// Mock data
const mockData = {
  inventoryImage:
    "https://likelion-hikikomori.s3.ap-northeast-2.amazonaws.com/inventory-default.png",
  inventoryBackgroundImage:
    "https://likelion-hikikomori.s3.ap-northeast-2.amazonaws.com/default.png",
};

const ImageRenderer = ({
  showInventoryImage = true,
  showBackgroundImage = true,
  children,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Data fetch simulation (using mock data for now)
    const fetchData = async () => {
      try {
        // Uncomment and use this for real data fetching
        /*
        const response = await fetch('https://your-api-endpoint.com/images'); // Replace with actual URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        */

        // Use mock data
        setData(mockData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showBackgroundImage && (
        <Image
          source={{ uri: data.inventoryBackgroundImage }}
          style={styles.backgroundImage}
        />
      )}
      {showInventoryImage && data.inventoryImage && (
        <Image
          source={{ uri: data.inventoryImage }}
          style={styles.inventoryImage}
        />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },
  inventoryImage: {
    width: 218,
    height: 218,
    // marginBottom: 20,
    zIndex: 1,
  },
});

export default ImageRenderer;
