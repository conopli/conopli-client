import { Text, View, Platform } from 'react-native';
import { theme } from '../theme';

const Search = () => {
  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <Text>검색</Text>
    </View>
  );
};

export default Search;
