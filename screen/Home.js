import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { theme } from '../theme';
import { Map, Populer, ListHome, Search, Login, New } from './index.js';
import GlobalModal from '../components/modal/GlobalModal';
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from '../components/DrawerContent';
import { TouchableOpacity, View } from 'react-native';
import { useRecoilValue, useRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import DrawerState from '../recoil/drawer';
import TooltipState from '../recoil/tooltip';
import { tooltipWord } from '../static/word';
import GlobalToolTip from '../components/tooltip/GlobalToolTip';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const { userId } = useRecoilValue(userInfo);
  const [isOpen, setIsOpen] = useRecoilState(DrawerState);
  const [toolTip, setToolTip] = useRecoilState(TooltipState);

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
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 79,
                paddingBottom: 40,
              }}
            >
              <View>
                <DrawerContent />
              </View>
            </View>
          );
        }}
      >
        <Tab.Navigator
          initialRouteName="Search"
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
            headerRight: () => {
              if (route.name !== 'ListHome') {
                return (
                  <TouchableOpacity
                    style={{ marginRight: 16 }}
                    onPress={() => {
                      const props = {
                        show: !toolTip.show,
                        text: tooltipWord[route.name],
                      };
                      setToolTip(props);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={24}
                      color={theme.white}
                    />
                  </TouchableOpacity>
                );
              }
            },
          })}
        >
          <Tab.Screen
            name="Populer"
            component={Populer}
            options={{
              title: '인기 차트',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="hotjar" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="New"
            component={New}
            options={{
              title: '신곡',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="new-box"
                  size={20}
                  color={color}
                />
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
        <GlobalToolTip />
      </Drawer>
    </NavigationContainer>
  );
};

export default Home;
