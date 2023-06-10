import { useRecoilValue } from 'recoil';
import userInfo from '../recoil/userInfo';
import { useServer } from '../../util';

const { userId } = useRecoilValue(userInfo);
const server = useServer();

/**
 * 곡 추가 + 곡 중복 제거
 * @param {string} playListId 곡을 추가할 플레이리스트 아이디
 * @param {Array} musicNum 추가할 곡 num 리스트
 * @param {Function} action 완료 후 실행하고 싶은 로직
 */

const addSongHelepr = async (
  playListId = '',
  musicNum = [],
  action = () => {},
) => {
  //유저 아이디는 여기서 알아서 recoil서 가져와서 사용한다
  try {
    const body = {
      userId,
      playListId,
      musicNum,
    };
    await server.post('/api/user-music', body);
    //TODO:: 추가 후 중복 제거 API 연결 필요
    //TODO:: action 잘 작동하는지 확인 필요
    await server.patch(`/api/user-music/duplication/${playListId}`);
    action();
  } catch (error) {
    console.log(error);
  }
};
