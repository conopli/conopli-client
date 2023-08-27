import { View, TouchableOpacity } from 'react-native';
import styles from './ModifyMusicItem.style';
import { memo } from 'react';
import { CustomText } from '../index';

const ModifyMusicItem = ({ item, select, setSelect }) => {
  const { title, singer, userMusicId, num } = item;
  const selectMusicIds = Object.keys(select);

  const selectHandler = () => {
    if (!selectMusicIds.includes(userMusicId))
      setSelect((prev) => {
        return { ...prev, [userMusicId]: num };
      });
    else {
      const selectObj = { ...select };
      delete selectObj[userMusicId];
      setSelect(selectObj);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectMusicIds.includes(userMusicId) && styles.select,
      ]}
      onPress={selectHandler}
    >
      <View style={styles.songInfo}>
        <CustomText style={styles.title} numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText style={styles.artist} numberOfLines={1}>
          {singer}
        </CustomText>
      </View>
      <View style={styles.numberBox}>
        <CustomText style={styles.number}>{num}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ModifyMusicItem);
