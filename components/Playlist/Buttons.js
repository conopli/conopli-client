import { theme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name="arrow-back-ios" size={24} color={theme.white} />
    </TouchableOpacity>
  );
};

export const ModifyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name="edit" size={24} color={theme.white} />
    </TouchableOpacity>
  );
};

export const ConfirmModifyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name="check" size={24} color={theme.white} />
    </TouchableOpacity>
  );
};

export const ModifyListButton = ({ onPress, type }) => {
  const styles = StyleSheet.create({
    btn: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      paddingHorizontal: 16,
      paddingVertical: 4,
      backgroundColor:
        type === 'select'
          ? theme.lightBlue
          : type === 'move'
          ? theme.white
          : theme.red,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color:
        type === 'select'
          ? theme.black
          : type === 'move'
          ? theme.black
          : theme.white,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text>
        {type === 'select'
          ? '전체선택'
          : type === 'move'
          ? '선택이동'
          : '선택삭제'}
      </Text>
    </TouchableOpacity>
  );
};
