import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ModifyMusicItem.style';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { MaterialIcons } from '@expo/vector-icons';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const SortMusicItem = gestureHandlerRootHOC(({ item, drag, isActive }) => {
  const { title, singer } = item;

  return (
    <ScaleDecorator activeScale={0.9}>
      <View style={styles.container}>
        <View style={styles.songInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {singer}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.handle}
          onLongPress={drag}
          disabled={isActive}
          delayLongPress={150}
        >
          <MaterialIcons name="drag-handle" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </ScaleDecorator>
  );
});

export default SortMusicItem;
