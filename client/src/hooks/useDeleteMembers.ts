import { useMutation } from 'react-query';
import axios from 'axios';

export function useDeleteMember() {
    return useMutation(async (memberId: string) => {
        const response = await axios.delete(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/members/${memberId}`);

        if (response.status !== 204) {
            throw new Error('Failed to delete member');
        }
    });
}
