import { Text, View } from 'react-native';
import { theme } from '../theme';
import SearchButton from '../components/SearchButton';
import SmallButton from '../components/SmallButton';
import RowButton from '../components/RowButton';

const Populer = () => {
  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <Text style={{ flex: 1 }}>인기차트</Text>
      <View style={{ flex: 1 }}>
        <SearchButton />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <SmallButton text="국내" />
        <SmallButton text="POP" />
        <SmallButton text="J-POP" />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
        <View style={{ width: '40%', marginRight: 8, height: 40 }}>
          <RowButton
            text="추가하기"
            color="lime"
            buttonHandler={() => console.log('눌렸다~')}
          />
        </View>
        <View style={{ width: '40%', height: 40 }}>
          <RowButton
            text="취소"
            color="lightGray"
            buttonHandler={() => console.log('눌렸다~')}
          />
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginBottom: 8, height: 40, width: '90%' }}>
          <RowButton
            text="수정"
            color="lime"
            buttonHandler={() => console.log('눌렸다~')}
          />
        </View>
        <View style={{ marginBottom: 8, height: 40, width: '90%' }}>
          <RowButton
            text="삭제"
            color="red"
            buttonHandler={() => console.log('눌렸다~')}
          />
        </View>
        <View style={{ height: 40, width: '90%' }}>
          <RowButton
            text="취소"
            color="lightGray"
            buttonHandler={() => console.log('눌렸다~')}
          />
        </View>
      </View>
    </View>
  );
};

export default Populer;
