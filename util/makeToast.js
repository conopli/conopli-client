import Toast from 'react-native-root-toast';
import { theme } from '../theme';
/**
 * 토스트 메세지를 띄우기 위한 함수입니다.
 * 다른 과정 없이 함수를 호출하고 메세지를 인자로 할당하면 자동으로 출력됩니다.
 * 경고, 오류 등의 메세지일 경우 추가로 인자를 입력하면 상단 border가 빨간색으로 표시됩니다.
 * @param {string} msg (required) 토스트 메세지로 출력될 문자열
 * @param {boolean} warning 경고, 오류 등의 토스트 메세지라면 true로 추가 (default: false)
 * @param {*} duration 메세지가 떠있는 시간 (default: 2500)
 */
const makeToast = (msg = '', warning = false, duration = 2500) => {
  Toast.show(msg, {
    duration: duration,
    position: Toast.positions.BOTTOM - 80,
    shadow: true,
    shadowColor: theme.black,
    shadowStyle: {
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    },
    delay: 200,
    backgroundColor: theme.background,
    opacity: 1,
    textColor: theme.white,
    textStyle: {
      fontFamily: 'Pretendard-600',
      fontSize: 16,
    },
    animation: true,
    containerStyle: {
      borderTopColor: warning ? theme.red : theme.lime,
      borderTopWidth: 3,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
  });
};

export default makeToast;
