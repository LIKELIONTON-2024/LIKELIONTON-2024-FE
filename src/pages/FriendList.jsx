import { SafeAreaView } from 'react-native';
import { COLOR } from '../styles/color';
import TopTab from '../components/Friends/TopTab';

export default () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      <TopTab />
    </SafeAreaView>
  );
};
