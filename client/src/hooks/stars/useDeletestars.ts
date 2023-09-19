import { useMutation } from 'react-query';

// DELETE 요청을 수행하는 함수
const deleteStarData = async (companyId: number) => {
    const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stars/?companyId=${companyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete star data.');
  }

  return response.json();
};

// react-query의 useMutation을 사용한 custom hook
const useDeleteStar = () => {
  return useMutation(deleteStarData);
};

export default useDeleteStar;
