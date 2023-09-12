import { useMutation } from 'react-query';
import axios from 'axios';

export function useDeleteMember() {
    return useMutation(async (password: string) => { // 비밀번호를 인자로 받음
        const response = await axios.delete(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/members/`, {
            data: { password } // 비밀번호를 request body에 전송
        });

        if (response.status !== 204) {
            throw new Error('Failed to delete member');
        }
    });
}
