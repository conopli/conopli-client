import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import {
  Map,
  Populer,
  ListHome,
  Search,
  Setting,
  Login,
  New,
} from './index.js';
import { useRecoilValue } from 'recoil';
import GlobalModal from '../components/modal/GlobalModal';
import userInfo from '../recoil/userInfo';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const { userId } = useRecoilValue(userInfo);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Populer"
        screenOptions={{
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
        }}
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
          name="New"
          component={New}
          options={{
            title: '이 달의 신곡',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="new-box" size={20} color={color} />
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
          name="Map"
          component={userId ? Map : Login}
          options={{
            title: '주변',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="map-marked-alt" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <GlobalModal />
    </NavigationContainer>
  );
};

export default Home;
