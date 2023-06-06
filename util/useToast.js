import Toast from 'react-native-root-toast';

const useToast = (msg = '', delay = 500) => {
  const toast = Toast.show('test', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    hideOnPress: true,
    delay: 0,
  });

  setTimeout(() => {
    Toast.hide(toast);
  }, delay);
};

export default useToast;
