import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform } from 'react-native';
import styles from './App.style';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from './theme';

export default function App() {
  const Tab = createBottomTabNavigator();

  const PopulerScreen = () => {
    return (
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <Text>인기차트</Text>
      </View>
    );
  };

  const MapScreen = () => {
    return (
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <Text>지도</Text>
      </View>
    );
  };

  const SearchScreen = () => {
    return (
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <Text>검색</Text>
      </View>
    );
  };

  const PlaylistScreen = () => {
    return (
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <Text>플레이리스트</Text>
      </View>
    );
  };

  const SettingScreen = () => {
    return (
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <Text>설정</Text>
      </View>
    );
  };

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
          component={PopulerScreen}
          options={{
            title: '인기',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="hotjar" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: '주변',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="map-marked-alt" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: '검색',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="search" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            title: '리스트',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="music" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: '설정',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="cog" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
