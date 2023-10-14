import { theme } from '../../theme';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText } from '../index';

export const BackButton = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <MaterialIcons
        name="arrow-back-ios"
        size={24}
        color={props.disabled ? theme.black : theme.white}
      />
    </TouchableOpacity>
  );
};

export const ModifyButton = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <MaterialIcons
        name="edit"
        size={24}
        color={props.disabled ? theme.black : theme.white}
      />
    </TouchableOpacity>
  );
};

export const ConfirmModifyButton = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <MaterialIcons
        name="check"
        size={24}
        color={props.disabled ? theme.black : theme.white}
      />
    </TouchableOpacity>
  );
};

export const SortButton = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <FontAwesome5
        name="sort"
        size={24}
        color={props.disabled ? theme.black : theme.white}
      />
    </TouchableOpacity>
  );
};

export const ModifyListButton = ({ onPress, type, disabled }) => {
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
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.btn}>
      <CustomText style={styles.text}>
        {type === 'select'
          ? '전체선택'
          : type === 'move'
          ? '선택이동'
          : '선택삭제'}
      </CustomText>
    </TouchableOpacity>
  );
};
