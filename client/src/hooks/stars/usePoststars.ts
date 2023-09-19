import { useMutation } from 'react-query';

const postStarData = async (companyId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const res = await fetch('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stars', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
    body: JSON.stringify({ companyId })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Something went wrong');
  }

  return res.json();
};

const usePostStar = () => {
  return useMutation(postStarData);
};

export default usePostStar;
