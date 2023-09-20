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

  // DELETE 요청은 본문을 반환하지 않는 경우가 많으므로 json 변환을 생략
  return true;  // 삭제가 성공적으로 완료됨을 나타냅니다.
};

const useDeleteStar = () => {
  return useMutation(deleteStarData);
};

export default useDeleteStar;
