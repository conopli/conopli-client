/**
 * alert 모달을 호출하기 위한 생성 함수입니다.
 * @param {string} title 모달 창의 제목
 * @param {string} subTitle 부가적으로 설명할 내용
 */
const alertProps = (title = '', subTitle = '') => {
  return {
    isOpen: true,
    modalType: 'alert',
    props: { title, subTitle },
  };
};

/**
 * confirm 모달을 호출하기 위한 생성 함수입니다.
 * @param {string} title title: 모달 창의 제목
 * @param {string} subTitle subTitle: 부가적으로 설명할 내용
 * @param {string} buttonText buttonText: '확인'에 들어갈 버튼의 텍스트
 * @param {function} handler hander: '확인'버튼을 터치 시 동작할 함수. 이 함수는 항상 콜백형태로 작성해야 함. (() => {func()})
 */
const confirmProps = (
  title = '',
  subTitle = '',
  buttonText = '',
  handler = () => {},
) => {
  return {
    isOpen: true,
    modalType: 'confirm',
    props: { title, subTitle, buttonText, handler },
  };
};

/**
 * 곡 추가 모달을 호출하기 위한 생성 함수입니다.
 * @param {Object} selectedSong selectedSong: 추가할 곡에 대한 객체
 * @param {Array} playList 상위 컴포넌트에서 하위 컴포넌트로 playList 전역 객체 전달
 */
const addSongProps = (selectedSong = {}, playList = []) => {
  return {
    isOpen: true,
    modalType: 'addSong',
    props: { selectedSong, playList },
  };
};

/**
 * 플레이리스트에서 longpress시 등장하는 모달을 위한 생성 함수입니다.
 * @param {function} editHandler editHandler: AddPlaylistModal을 호출하기 위한 함수
 * @param {function} deleteHandler deleteHandler: DeletePlaylistModal을 호출하기 위한 함수
 */
const editPlaylistProps = (
  editHandler = () => {},
  deleteHandler = () => {},
) => {
  return {
    isOpen: true,
    modalType: 'editPlaylist',
    props: { editHandler, deleteHandler },
  };
};

/**
 * 플레이리스트 추가/수정 모달 호출을 위한 생성 함수입니다.
 * 수정 시에는 playListId, oldName, oldIcon, oldColor가 모두 포함되어야 합니다.
 * @param {boolean} isEdit (required) isEdit: 플레이리스트 수정 여부
 * @param {number} playListId playListId: 수정할 playlist의 Id
 * @param {string} oldName oldName: 수정할 playlist의 이름
 * @param {number} oldIcon oldIcon: 수정할 playlist의 이모지
 * @param {string} oldColor oldColor: 수정할 playlist의 색상
 */
const addPlaylistProps = (
  isEdit = false,
  playListId = 0,
  oldName = '',
  oldIcon = 127925,
  oldColor = '18',
) => {
  return {
    isOpen: true,
    modalType: 'addPlaylist',
    props: { playListId, isEdit, oldName, oldIcon, oldColor },
  };
};

/**
 * 플레이리스트 삭제 확인 모달 호출을 위한 생성 함수입니다.
 * @param {number} playListId playListId: 삭제할 playlist의 Id
 */
const deletePlaylistProps = (playListId = 0) => {
  return {
    isOpen: true,
    modalType: 'delete',
    props: { playListId },
  };
};

/**
 * 설정 페이지 상세 (ex: 탈퇴하기, 문의하기 버튼 등) 모달 호출을 위한 생성 함수입니다.
 * @param {number} leaveHandler 회원탈퇴
 */
const settingProps = (leaveHandler = () => {}) => {
  return {
    isOpen: true,
    modalType: 'setting',
    props: { leaveHandler },
  };
};

export {
  alertProps,
  confirmProps,
  addPlaylistProps,
  addSongProps,
  deletePlaylistProps,
  editPlaylistProps,
  settingProps,
};
