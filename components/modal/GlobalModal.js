import ModalState from '../../recoil/modal.js';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { Modal, TouchableOpacity } from 'react-native';
import {
  AddSongModal,
  ConfirmModal,
  DeleteModal,
  EditPlaylistModal,
  AddPlaylistModal,
  AlertModal,
  MoveSongModal,
  SettingModal,
} from './index.js';
import styles from './GlobalModal.style';
import Tooltip from 'react-native-walkthrough-tooltip';

const GlobalModal = () => {
  const { isOpen, modalType, props } = useRecoilValue(ModalState);
  const reset = useResetRecoilState(ModalState);

  if (!isOpen) return;

  const modal = {
    addSong: <AddSongModal {...props} />,
    confirm: <ConfirmModal {...props} />,
    delete: <DeleteModal {...props} />,
    alert: <AlertModal {...props} />,
    editPlaylist: <EditPlaylistModal {...props} />,
    addPlaylist: <AddPlaylistModal {...props} />,
    moveSong: <MoveSongModal {...props} />,
    setting: <SettingModal {...props} />,
    tooltip: <Tooltip {...props} />,
  };

  return (
    <Modal animationType="fade" transparent={isOpen} visible={isOpen}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backdrop}
        onPress={() => {
          reset();
        }}
      >
        {modal[modalType]}
      </TouchableOpacity>
    </Modal>
  );
};

export default GlobalModal;
