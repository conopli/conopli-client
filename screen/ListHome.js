import { Text, View, Platform } from 'react-native';
import { theme } from '../theme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Playlist, PlaylistDetail, PlaylistModify } from './index';

const ListHome = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Playlist"
      screenOptions={{
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
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{ title: '내 플레이리스트' }}
      />
      <Stack.Screen
        name="Detail"
        component={PlaylistDetail}
        options={{ title: '플레이리스트' }}
      />
      <Stack.Screen
        name="Modify"
        component={PlaylistModify}
        options={{ title: '플레이리스트 수정' }}
      />
    </Stack.Navigator>
  );
};

export default ListHome;
