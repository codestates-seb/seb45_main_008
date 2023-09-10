import { useQuery } from 'react-query';
import axios from 'axios';

function useGetMemberInfo(memberId: number | null) {
  return useQuery(['member', memberId], async () => {
    const response = await axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/members/${memberId}`);
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch member data');
    }
  });
}

export default useGetMemberInfo;