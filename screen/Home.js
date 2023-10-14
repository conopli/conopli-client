import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { theme } from '../theme';
import { Map, Populer, ListHome, Search, Setting, Login } from './index.js';
import GlobalModal from '../components/modal/GlobalModal';
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from '../components/DrawerContent';
import { TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import userInfo from '../recoil/userInfo';
import DrawerState from '../recoil/drawer';
import { useRecoilState } from 'recoil';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const { userId } = useRecoilValue(userInfo);
  const [isOpen, setIsOpen] = useRecoilState(DrawerState);

  return (
    <NavigationContainer>
      <Drawer
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        drawerType="front"
        drawerStyle={{ backgroundColor: theme.background }}
        renderDrawerContent={() => {
          return (
            <View style={{ paddingHorizontal: 32, paddingVertical: 50 }}>
              <View>
                <DrawerContent />
              </View>
            </View>
          );
        }}
      >
        <Tab.Navigator
          initialRouteName="Populer"
          screenOptions={({ route, navigation }) => ({
            tabBarActiveTintColor: theme.lime,
            tabBarInactiveTintColor: theme.violet,
            tabBarStyle: {
              backgroundColor: theme.black,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontFamily: 'Pretendard-400',
              fontSize: 10,
              paddingBottom: 5,
            },
            headerStyle: {
              backgroundColor: theme.black,
              elevation: 0,
              shadowColor: 'rgba(0, 0, 0, 0)',
            },
            headerTitleStyle: {
              fontFamily: 'Pretendard-600',
              fontSize: 24,
              color: theme.white,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  setIsOpen((prev) => !prev);
                }}
                style={{ marginLeft: 16 }}
              >
                <Entypo name="menu" size={24} color={theme.white} />
              </TouchableOpacity>
            ),
          })}
        >
          <Tab.Screen
            name="Populer"
            component={Populer}
            options={{
              title: '노래방 인기 차트',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="hotjar" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={userId ? Map : Login}
            options={{
              title: '주변',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="map-marked-alt" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              title: '검색',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="search" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="ListHome"
            component={userId ? ListHome : Login}
            options={{
              title: '플레이리스트',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="music" size={20} color={color} />
              ),
              headerShown: userId ? false : true,
            }}
          />
          <Tab.Screen
            name="Setting"
            component={userId ? Setting : Login}
            options={{
              title: '설정',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="cog" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
        <GlobalModal />
      </Drawer>
    </NavigationContainer>
  );
};

export default Home;
