import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { Map, Populer, ListHome, Search, Setting, Login } from './index.js';
import { useRecoilValue } from 'recoil';
import GlobalModal from '../components/Modal/GlobalModal';
import userInfo from '../recoil/userInfo';
import { useFonts } from 'expo-font';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const { userId } = useRecoilValue(userInfo);

  const [fontsLoaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardJPVariable.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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
            fontFamily: 'Pretendard',
            fontSize: 10,
            paddingBottom: 5,
            fontWeight: '700',
          },
          tabBarIconStyle: { paddingTop: 5 },
          headerStyle: {
            backgroundColor: theme.black,
          },
          headerTitleStyle: {
            fontFamily: 'Pretendard',
            fontSize: 24,
            fontWeight: '700',
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
          component={ListHome}
          options={{
            title: '리스트',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="music" size={20} color={color} />
            ),
            headerShown: false,
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
    </NavigationContainer>
  );
};

export default Home;
