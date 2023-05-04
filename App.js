import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from './theme';
import { Map, Populer, ListHome, Search, Setting } from './screen';
import { RecoilRoot } from 'recoil';
import GlobalModal from './components/Modal/GlobalModal';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <RecoilRoot>
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
              fontSize: 10,
              paddingBottom: 5,
              fontWeight: '700',
            },
            tabBarIconStyle: { paddingTop: 5 },
            headerStyle: {
              backgroundColor: theme.black,
            },
            headerTitleStyle: {
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
            component={Map}
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
            component={Setting}
            options={{
              title: '설정',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="cog" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <GlobalModal />
    </RecoilRoot>
  );
}
