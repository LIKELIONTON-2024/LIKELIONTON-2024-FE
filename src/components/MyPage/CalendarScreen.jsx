import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { LeftArrow, RightArrow } from "./CustomArrows";
import ConsecutiveDaysDisplay from "./ConsecutiveDaysDisplay";
import { calculateConsecutiveDays } from "./dateUtils";
import { CalendarLocaleConfig } from "./CalendarLocaleConfig";
// import CalendarModal from '../../../components/CalendarModal';

import { COLOR } from "../../styles/color";

CalendarLocaleConfig();

const CalendarScreen = () => {
  // const [selectedDate, setSelectedDate] = useState('');
  // const [modalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [consecutiveDays, setConsecutiveDays] = useState(0);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;

    setMarkedDates((prevDates) => {
      const newMarkedDates = { ...prevDates };
      newMarkedDates[dateString] = {
        selected: true,
        marked: true,
        selectedColor: COLOR.BLUE_400,
      };
      return newMarkedDates;
    });

    // setSelectedDate(dateString);
    // setModalVisible(true);
  };

  useEffect(() => {
    const dates = Object.keys(markedDates);
    setConsecutiveDays(calculateConsecutiveDays(dates));
  }, [markedDates]);
  // TODO: 캘린더 날짜 셀 크기 커스텀 되는지 보고 안되면 직접 만들어야 할 듯...
  // TODO: 커스텀 된다면 마진 값들 확인,,!!
  return (
    <ScrollView>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          current={getCurrentDate()}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          monthFormat={"yyyy.MM"}
          renderArrow={(direction) => {
            if (direction === "left") return <LeftArrow />;
            if (direction === "right") return <RightArrow />;
          }}
        />
        <ConsecutiveDaysDisplay consecutiveDays={consecutiveDays} />
        {/* // 모달은 일단 추후에, 지금은 굳이
        <CalendarModal
          visible={modalVisible}
          date={selectedDate}
          onClose={() => setModalVisible(false)}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  calendar: {
    top: -16,
    width: 250,
    height: 280,
  },
});

export default CalendarScreen;
