import { atom } from 'recoil';

const TooltipState = atom({
  key: 'TooltipState',
  default: {
    show: false,
    text: '',
  },
});

export default TooltipState;
