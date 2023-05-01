import { theme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

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
