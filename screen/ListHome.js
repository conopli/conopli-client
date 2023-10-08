import { theme } from '../theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Playlist,
  PlaylistModify,
  PlaylistDetail,
  PlaylistSort,
} from './Playlist';
import { TouchableOpacity } from 'react-native';
import DrawerState from '../recoil/drawer';
import { useSetRecoilState } from 'recoil';
import { Entypo } from '@expo/vector-icons';

const ListHome = () => {
  const Stack = createNativeStackNavigator();
  const setIsOpen = useSetRecoilState(DrawerState);

  return (
    <Stack.Navigator
      initialRouteName="Playlist"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.black,
        },
        headerTitleStyle: {
          fontFamily: 'Pretendard-600',
          fontSize: 24,
          color: theme.white,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.white,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{
          title: '내 플레이리스트',
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
        }}
      />
      <Stack.Screen name="Detail" component={PlaylistDetail} />
      <Stack.Screen
        name="Modify"
        component={PlaylistModify}
        options={{ title: '플레이리스트 수정' }}
      />
      <Stack.Screen
        name="Sort"
        component={PlaylistSort}
        options={{ title: '플레이리스트 순서 변경' }}
      />
    </Stack.Navigator>
  );
};

export default ListHome;
