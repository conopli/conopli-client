import { theme } from '../theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Playlist,
  PlaylistModify,
  PlaylistDetail,
  PlaylistSort,
} from './Playlist';
import userInfo from '../recoil/userInfo';
import { useRecoilValue } from 'recoil';
import { useFonts } from 'expo-font';
import Login from './Login';

const ListHome = () => {
  const Stack = createNativeStackNavigator();
  const { userId } = useRecoilValue(userInfo);

  const [fontsLoaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardJPVariable.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName="Playlist"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.black,
        },
        headerTitleStyle: {
          fontFamily: 'Pretendard',
          fontSize: 24,
          fontWeight: '700',
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.white,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Playlist"
        component={userId ? Playlist : Login}
        options={{ title: '내 플레이리스트' }}
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
