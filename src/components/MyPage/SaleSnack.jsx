import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { COLOR } from "../../styles/color";
const SnackIcon = require("../../assets/icons/snackIcon.png");

const snackCnt = 3;
const SaleSnack = () => {
  return (
    <View style={styles.snackContainer}>
      <Text style={styles.snack}> 츄르</Text>
      <Image source={SnackIcon} style={styles.snackImg}></Image>
      <Text style={styles.snackCount}>{snackCnt}</Text>
      <Text style={styles.snack}>개로 구매 가능</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  snackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 187,
    height: 35,
    backgroundColor: COLOR.YELLOW_100,
    borderRadius: 20,
    marginBottom: 21,
  },
  snack: {
    fontSize: 15,
  },
  snackImg: {
    height: 16,
    width: 16,
    marginLeft: 2,
    marginRight: 1,
  },
  snackCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR.BLUE_300,
    marginRight: 1,
  },
});
export default SaleSnack;
