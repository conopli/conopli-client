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
import axios from 'axios';
import server from '../util/axios';

const Search = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('KOR');
  const [items, setItems] = useState([
    { label: '한국', value: 'KOR' },
    { label: '영어', value: 'ENG' },
    { label: '일본', value: 'JPN' },
  ]);
  const [searchResult, setSearchResult] = useState(searchDummy.data);
  const [textValue, setTextValue] = useState('');
  //제목 vs 가수 필터 버튼 값
  const [isClicked, setIsClicked] = useState(false);

  const inputRef = useRef(null);
  const searchInputHander = async () => {
    const filter = isClicked ? 2 : 1;
    try {
      const { data } = await server.get(
        `/api/search?searchType=${filter}&searchKeyWord=${textValue}&searchNation=${value}&page=0`,
      );
      setSearchResult(data.data);
      setTextValue('');
    } catch (error) {
      console.log(error);
    }
    inputRef.current.blur();
  };

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
        <SearchButton isClicked={isClicked} setIsClicked={setIsClicked} />
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
        data={searchResult}
        renderItem={({ item }) => <MusicItem item={item} />}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default Search;
