import {LocaleConfig} from 'react-native-calendars';

export const CalendarLocaleConfig = () => {
  LocaleConfig.locales['ko'] = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1.',
      '2.',
      '3.',
      '4.',
      '5.',
      '6.',
      '7.',
      '8.',
      '9.',
      '10.',
      '11.',
      '12.',
    ],
    dayNames: ['월', '화', '수', '목', '금', '토', '일'],
    dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
    today: '오늘',
  };

  LocaleConfig.defaultLocale = 'ko';
};
