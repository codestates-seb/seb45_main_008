import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setMemberInfo } from '../../reducer/member/memberInfoSlice.ts';
import { useGetMemberInfo } from '../../hooks/useGetMemberInfo.ts';
import { RootState } from '../../reducer/member/rootReducer';

const LoginConfirmationModal: React.FC<LoginConfirmationProps> = ({ onClose }) => {
    const messageText = "로그인이 성공적으로 완료되었습니다!";
    const confirmText = "확인"
    const loadingText = "로딩 중...";
    const errorText = "데이터를 가져오는 중 문제가 발생했습니다.";

    const memberId: number | null = useSelector((state: RootState) => state.login.memberId);
  
    const { data, error, isLoading } = useGetMemberInfo(memberId);
    
    const dispatch = useDispatch();

    useEffect(() => {
      if (data) {
        dispatch(setMemberInfo(data));
      }
    }, [data, dispatch]);

    return (
      <ModalBackground>
        <ModalContainer>
          {isLoading ? (
            <Message>{loadingText}</Message>
          ) : error ? (
            <Message>{errorText}</Message>
          ) : (
            <Message>{messageText}</Message>
          )}
          <ConfirmButton onClick={onClose}>{confirmText}</ConfirmButton>
        </ModalContainer>
      </ModalBackground>
    );
};

export default LoginConfirmationModal;

interface LoginConfirmationProps {
    onClose: () => void;
}

// ... Styled Components for ModalBackground, ModalContainer, Message, ConfirmButton ...
const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;


// 확인 버튼 스타일
const ConfirmButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: darkslategray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
