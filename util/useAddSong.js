import { useRecoilValue } from 'recoil';
import userInfo from '../recoil/userInfo';
import { useServer } from './index';

/**
 * 곡 추가 + 곡 중복 제거
 * @param {string} playListId 곡을 추가할 플레이리스트 아이디
 * @param {Array} musicNum 추가할 곡 num 리스트
 * @param {Function} action 완료 후 실행하고 싶은 로직
 */

const useAddSong = async (
  playListId = '',
  musicNum = [],
  action = () => {},
) => {
  const { userId } = useRecoilValue(userInfo);
  const server = useServer();

  try {
    const body = {
      userId,
      playListId,
      musicNum,
    };
    await server.post('/api/user-music', body);
    await server.patch(`/api/user-music/duplication/${playListId}`);
    return action();
  } catch (error) {
    console.log(error);
  }
};

export default useAddSong;
