import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { LeftArrow, RightArrow } from "./CustomArrows";
import ConsecutiveDaysDisplay from "./ConsecutiveDaysDisplay";
import { CalendarLocaleConfig } from "./CalendarLocaleConfig";
import { COLOR } from "../../styles/color";

CalendarLocaleConfig();

const CalendarScreen = ({ data }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [consecutiveDays, setConsecutiveDays] = useState(0);

  useEffect(() => {
    if (data) {
      const visitDays = data.visitDays.map((date) => date.split("T")[0]);
      const newMarkedDates = {};
      visitDays.forEach((date) => {
        newMarkedDates[date] = {
          selected: true,
          marked: true,
          selectedColor: COLOR.BLUE_400,
        };
      });
      setMarkedDates(newMarkedDates);
      setConsecutiveDays(data.consecutiveDays);
    }
  }, [data]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          current={new Date().toISOString().split("T")[0]}
          markedDates={markedDates}
          monthFormat={"yyyy.MM"}
          renderArrow={(direction) => {
            if (direction === "left") return <LeftArrow />;
            if (direction === "right") return <RightArrow />;
          }}
        />
        <ConsecutiveDaysDisplay consecutiveDays={consecutiveDays} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  calendar: {
    top: -12,
    width: 360,
    height: 300,
  },
});

export default CalendarScreen;
