import { Text, View } from 'react-native';
import { theme } from '../theme';
import SmallButton from '../components/SmallButton';
import chart_dummy from '../assets/chart_dummy';
import ListItem from '../components/popular/ListItem';
import styles from './Populer.style.js';

const Populer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <SmallButton text="가요" />
        <View style={styles.abroad}>
          <SmallButton text="POP" style={styles.pop} />
          <SmallButton text="J-POP" />
        </View>
      </View>
      <View
        style={{
          flex: 9,
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
      </View>
    </View>
  );
};

export default Populer;
