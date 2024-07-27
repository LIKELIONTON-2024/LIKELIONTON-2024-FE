const Tab = createMaterialTopTabNavigator();
export default function CustomTopTab() {
  return (
    <>
      <Header title={'스위트룸'} backScreen="Mystudy" />
      <Tab.Navigator
        initialRouteName="SuiteRoomDashboard"
        screenOptions={{
          tabBarActiveTintColor: '#050953',
          tabBarLabelStyle: {fontSize: 14, color: '#050953'},
          tabBarStyle: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="대시보드"
          component={SuiteRoomDashboard}
          options={{tabBarLabel: '대시보드'}}
        />
        <Tab.Screen
          name="칸반보드"
          component={SuiteRoomCanbanBoard}
          options={{tabBarLabel: '칸반보드'}}
        />
        <Tab.Screen
          name="내출석부"
          component={SuiteRoomMyAttendance}
          options={{tabBarLabel: '내출석부'}}
        />
        <Tab.Screen
          name="스위트룸"
          component={SuiteRoomDetailStart}
          options={{tabBarLabel: '스위트룸'}}
        />
      </Tab.Navigator>
    </>
  );
}
