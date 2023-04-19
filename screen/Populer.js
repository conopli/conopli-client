import { Text, View } from 'react-native';
import SmallButton from '../components/SmallButton';
import chart_dummy from '../assets/chart_dummy';
import ListItem from '../components/popular/ListItem';
import styles from './Populer.style.js';
import { ScrollView } from 'react-native';
import { useState } from 'react';

const Populer = () => {
  //임시로 만든 상태라 조잡함. 이후 수정할 수 있으면 수정 필요.
  const [clicked, setClicked] = useState([false, false, false]);

  const clickHandelr = (e) => {
    console.log(e.nativeEvent.target);
    if (e.nativeEvent.target === 1409) {
      setClicked([true, false, false]);
    } else if (e.nativeEvent.target === 1417) {
      setClicked([false, true, false]);
    } else if (e.nativeEvent.target === 1425) {
      setClicked([false, false, true]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <SmallButton
          text="가요"
          isClicked={clicked[0]}
          setIsClicked={clickHandelr}
        />
        <View style={styles.abroad}>
          <SmallButton
            text="POP"
            isClicked={clicked[1]}
            setIsClicked={clickHandelr}
          />
          <SmallButton
            text="J-POP"
            isClicked={clicked[2]}
            setIsClicked={clickHandelr}
          />
        </View>
      </View>
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={{ rowGap: 8 }}
      >
        <ListItem
          rate={chart_dummy[0].rate}
          title={chart_dummy[0].title}
          singer={chart_dummy[0].singer}
          number={chart_dummy[0].cono_number}
        />
        <ListItem
          rate={chart_dummy[1].rate}
          title={chart_dummy[1].title}
          singer={chart_dummy[1].singer}
          number={chart_dummy[1].cono_number}
        />
        <ListItem
          rate={chart_dummy[2].rate}
          title={chart_dummy[2].title}
          singer={chart_dummy[2].singer}
          number={chart_dummy[2].cono_number}
        />
        <ListItem
          rate={chart_dummy[3].rate}
          title={chart_dummy[3].title}
          singer={chart_dummy[3].singer}
          number={chart_dummy[3].cono_number}
        />
        <ListItem
          rate={chart_dummy[4].rate}
          title={chart_dummy[4].title}
          singer={chart_dummy[4].singer}
          number={chart_dummy[4].cono_number}
        />
        <ListItem
          rate={chart_dummy[5].rate}
          title={chart_dummy[5].title}
          singer={chart_dummy[5].singer}
          number={chart_dummy[5].cono_number}
        />
        <ListItem
          rate={chart_dummy[6].rate}
          title={chart_dummy[6].title}
          singer={chart_dummy[6].singer}
          number={chart_dummy[6].cono_number}
        />
        <ListItem
          rate={chart_dummy[7].rate}
          title={chart_dummy[7].title}
          singer={chart_dummy[7].singer}
          number={chart_dummy[7].cono_number}
        />
        <ListItem
          rate={chart_dummy[8].rate}
          title={chart_dummy[8].title}
          singer={chart_dummy[8].singer}
          number={chart_dummy[8].cono_number}
        />
        <ListItem
          rate={chart_dummy[9].rate}
          title={chart_dummy[9].title}
          singer={chart_dummy[9].singer}
          number={chart_dummy[9].cono_number}
        />
        <ListItem
          rate={chart_dummy[10].rate}
          title={chart_dummy[10].title}
          singer={chart_dummy[10].singer}
          number={chart_dummy[10].cono_number}
        />
        <ListItem
          rate={chart_dummy[10].rate}
          title={chart_dummy[10].title}
          singer={chart_dummy[10].singer}
          number={chart_dummy[10].cono_number}
        />
        <ListItem
          rate={chart_dummy[10].rate}
          title={chart_dummy[10].title}
          singer={chart_dummy[10].singer}
          number={chart_dummy[10].cono_number}
        />
        <ListItem
          rate={chart_dummy[10].rate}
          title={chart_dummy[10].title}
          singer={chart_dummy[10].singer}
          number={chart_dummy[10].cono_number}
        />
        <ListItem
          rate={chart_dummy[10].rate}
          title={chart_dummy[10].title}
          singer={chart_dummy[10].singer}
          number={chart_dummy[10].cono_number}
        />
        <ListItem
          rate={chart_dummy[10].rate}
          title={chart_dummy[10].title}
          singer={chart_dummy[10].singer}
          number={chart_dummy[10].cono_number}
        />
      </ScrollView>
    </View>
  );
};

export default Populer;
