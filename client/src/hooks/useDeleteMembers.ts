import { useMutation } from 'react-query';
import axios from 'axios';

export function useDeleteMember() {
    return useMutation(async () => { 
        const response = await axios.delete(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/members/`);

        if (response.status !== 204) {
            throw new Error('Failed to delete member');
        }
    }, {
        onSuccess: () => {
            alert('회원탈퇴 되었습니다!');
        }
    });
}
