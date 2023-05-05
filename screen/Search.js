import { View, TextInput, ScrollView, FlatList } from 'react-native';
import styles from './Search.style';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useRef } from 'react';
import SearchButton from '../components/SearchButton';
import MusicItem from '../components/MusicItem';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { searchDummy } from '../util';
import { theme } from '../theme.js';
import ModalState from '../recoil/modal';
import { useSetRecoilState } from 'recoil';

const Search = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('kpop');
  const [items, setItems] = useState([
    { label: '한국', value: 'kpop' },
    { label: '영어', value: 'pop' },
    { label: '일본', value: 'jpop' },
  ]);

  const [textValue, setTextValue] = useState('');
  const inputRef = useRef(null);
  const searchInputHander = () => {
    console.log('검색: ', textValue);
    inputRef.current.blur();
  };

  //! 후에 더미데이터로 작업 시 FlatList 사용할 것
  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownPicker
          style={styles.picker}
          dropDownContainerStyle={styles.dropdownContainer}
          containerStyle={{ width: 80 }} // ! 드롭다운 가로 크기 고정값 필요 시, 100%일 경우 지워도 됨
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="제목으로 검색하세요"
            placeholderTextColor={theme.gray}
            value={textValue}
            onChangeText={setTextValue}
            onSubmitEditing={searchInputHander}
            ref={inputRef}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <MaterialIcons
              name="search"
              size={28}
              color="black"
              onPress={searchInputHander}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={styles.resultList}
        data={searchDummy.data}
        renderItem={({ item }) => <MusicItem item={item} />}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default Search;
