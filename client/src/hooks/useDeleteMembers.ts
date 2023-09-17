import { useMutation } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';  // <-- 이 부분을 추가하세요.
import { setLogoutState } from '../reducer/member/loginSlice';

export function useDeleteMember() {
    const dispatch = useDispatch();  // <-- useDispatch를 호출해 dispatch 함수를 가져옵니다.

    return useMutation(async () => {
        const response = await axios.delete(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/members`, {});

        if (response.status !== 204) {
            throw new Error('Failed to delete member');
        }
    }, {
        onSuccess: () => {
            // 토큰 삭제
            localStorage.removeItem('accessToken');
            
            // 로그아웃 상태로 변경
            dispatch(setLogoutState());

            // 페이지 새로고침 (선택사항)
            window.location.reload();
        }
    });
}