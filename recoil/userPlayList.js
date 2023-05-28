import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';

const asyncStorageEffect =
  (key) =>
  async ({ setSelf, onSet, trigger }) => {
    const loadPersisted = async () => {
      const savedValue = await AsyncStorage.getItem(key);

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    };

    if (trigger === 'get') loadPersisted();

    onSet(async (newValue, _, isReset) => {
      if (isReset) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

const userPlayList = atom({
  key: 'userPlayList',
  default: [],
  effects: [asyncStorageEffect('user_playList')],
});

export default userPlayList;
