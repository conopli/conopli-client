import SmallButton from '../components/SmallButton';
import ListItem from '../components/Popular/ListItem';
import styles from './Populer.style.js';
import { View, FlatList } from 'react-native';
import { useState } from 'react';
import { populerDummy } from '../util/dummyData';

const Populer = () => {
  const [nation, setNation] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <SmallButton
          text="가요"
          isClicked={nation === 1}
          setIsClicked={() => {
            setNation(1);
          }}
        />
        <View style={styles.abroad}>
          <SmallButton
            text="POP"
            isClicked={nation === 2}
            setIsClicked={() => {
              setNation(2);
            }}
          />
          <SmallButton
            text="J-POP"
            isClicked={nation === 3}
            setIsClicked={() => {
              setNation(3);
            }}
          />
        </View>
      </View>
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={{ rowGap: 8 }}
        data={populerDummy.data}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
};

export default Populer;
