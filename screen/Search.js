import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './Search.style';
import SmallButton from '../components/SmallButton';
import { useState, useRef, useEffect } from 'react';
import { SearchButton, MusicItem, CustomText } from '../components';
import { MaterialIcons } from '@expo/vector-icons';
import { makeToast, useServer } from '../util';
import { theme } from '../theme.js';

const Search = ({ navigation, route }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [textValue, setTextValue] = useState('');
  //국가
  const [nation, setNation] = useState('KOR');
  //제목 vs 가수 필터 버튼 값
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  //filter, textValue, nation 값 저장 - 다음 페이지 가지고 올 때 사용
  const [prevConfig, setPrevConfig] = useState(null);
  const [pageInfo, setPageInfo] = useState({ page: 0, totalPages: 0 });
  const server = useServer();
  const inputRef = useRef(null);

  const getData = async ({
    filter = 1,
    textValue = '',
    nation = 'KOR',
    page = 0,
  }) => {
    const { data } = await server.get(
      `/api/search?searchType=${filter}&searchKeyWord=${textValue}&searchNation=${nation}&page=${page}`,
    );

    return data;
  };

  //검색
  const searchHander = async () => {
    const filter = isClicked ? 2 : 1;

    if (textValue.length === 0) {
      makeToast(`검색어를 입력하세요.`);
      return;
    }

    try {
      setIsLoading(true);
      const params = { filter, textValue, nation, page: pageInfo.page };
      const data = await getData(params);
      setSearchResult(data.data);
      setPageInfo(data.pageInfo);
      setPrevConfig({ filter, textValue, nation });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    inputRef.current.blur();
  };

  //무한 스크롤
  const nextPageHandler = async () => {
    if (isAddLoading) return;

    const { page, totalPages } = pageInfo;

    if (page === totalPages - 1 || this.onEndReachedCalledDuringMomentum)
      return;

    const { filter, textValue, nation } = prevConfig;

    setIsAddLoading(true);
    const params = { filter, textValue, nation, page: page + 1 };
    const data = await getData(params);
    setSearchResult((prev) => [...prev, ...data.data]);
    setPageInfo(data.pageInfo);
    this.onEndReachedCalledDuringMomentum = false;
    setIsAddLoading(false);
  };

  //검색어 & 검색 결과 초기화
  const initializeInput = () => {
    setTextValue('');
    setSearchResult([]);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      //필터 및 검색어 초기화
      initializeInput();
      setNation('KOR');
      setIsClicked(false);
    });
  }, [route]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <SmallButton
          text="한국"
          isClicked={nation === 'KOR'}
          setIsClicked={() => {
            setNation('KOR');
          }}
        />
        <View style={styles.abroad}>
          <SmallButton
            text="영미"
            isClicked={nation === 'ENG'}
            setIsClicked={() => {
              setNation('ENG');
            }}
          />
          <SmallButton
            text="일본"
            isClicked={nation === 'JPN'}
            setIsClicked={() => {
              setNation('JPN');
            }}
          />
        </View>
      </View>
      <View style={styles.search}>
        <SearchButton isClicked={isClicked} setIsClicked={setIsClicked} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`${isClicked ? '가수명' : '제목'}으로 검색하세요`}
            placeholderTextColor={theme.gray}
            value={textValue}
            onChangeText={setTextValue}
            onSubmitEditing={searchHander}
            ref={inputRef}
          />
          <TouchableOpacity style={styles.searchIcon}>
            {textValue.length ? (
              <MaterialIcons
                name="close"
                size={20}
                color="gray"
                onPress={initializeInput}
              />
            ) : null}
            <MaterialIcons
              name="search"
              size={28}
              color="black"
              onPress={searchHander}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.result}>
        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1 }}
            size="large"
            color={theme.lime}
          />
        ) : searchResult === null ? (
          <CustomText style={styles.descText}>검색어를 입력하세요</CustomText>
        ) : searchResult.length === 0 ? (
          <CustomText style={styles.descText}>검색 결과가 없습니다</CustomText>
        ) : (
          <FlatList
            data={searchResult}
            renderItem={({ item }) => <MusicItem isAdd={true} item={item} />}
            // TODO: 검색 정상화 이후 되돌릴 것 keyExtractor={(item) => item.num}
            contentContainerStyle={{ rowGap: 8, paddingBottom: 12 }}
            ListFooterComponent={(props) =>
              isAddLoading && (
                <ActivityIndicator
                  style={{ flex: 1 }}
                  size="large"
                  color={theme.lime}
                  {...props}
                />
              )
            }
            onEndReached={nextPageHandler}
            onEndReachedThreshold={0}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Search;
