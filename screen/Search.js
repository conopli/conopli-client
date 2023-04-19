import { View, TextInput, ScrollView } from 'react-native';
import styles from './Search.style';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import SearchButton from '../components/SearchButton';
import MusicItem from '../components/MusicItem';

const Search = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('kpop');
  const [items, setItems] = useState([
    { label: '한국', value: 'kpop' },
    { label: '영어', value: 'pop' },
    { label: '일본', value: 'jpop' },
  ]);

  //! 후에 더미데이터로 작업 시 FlatList 사용할 것
  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownPicker
          style={styles.picker}
          containerStyle={{ width: 'auto' }}
          textStyle={{ fontSize: 16, fontWeight: 'bold' }}
          arrowIconContainerStyle={{ marginLeft: 4 }}
          tickIconContainerStyle={{ marginLeft: 4 }}
          placeholder={value}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View style={styles.search}>
        <SearchButton />
        <TextInput style={styles.input} />
      </View>
      <ScrollView
        style={styles.resultList}
        contentContainerStyle={{ rowGap: 8 }}
      >
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
      </ScrollView>
    </View>
  );
};

export default Search;
