import { atom } from 'recoil';

const TooltipState = atom({
  key: 'TooltipState',
  default: {
    show: false,
    routeType: '',
  },
});

export default TooltipState;
