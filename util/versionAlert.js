import { BackHandler, Linking, Alert } from 'react-native';

const versionAlert = () => {
  Alert.alert(
    '필수 업데이트 안내',
    `새로운 버전이 업데이트 되었습니다.\n확인을 누르시면 스토어로 이동합니다.\n(업데이트를 하지 않으면 앱을 이용할 수 없습니다.)`,
    [
      {
        text: '확인',
        onPress: () => {
          Linking.openURL('market://details?id=com.conopli');
          BackHandler.exitApp();
        },
      },
      {
        text: '취소',
        onPress: () => {
          BackHandler.exitApp();
        },
        style: 'cancle',
      },
    ],
  );
};

export default versionAlert;
