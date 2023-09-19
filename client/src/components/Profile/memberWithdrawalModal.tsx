import React, { useState } from 'react';
import styled from 'styled-components'; 
import { useDeleteMember } from '../../hooks/useDeleteMembers';


const MemberWithdrawalModal: React.FC<MemberWithdrawalModalProps> = ({ onClose, onErrorVisibility }) => {

    const [inputString, setInputString] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const deleteMemberMutation = useDeleteMember();


    const withdrawalTitle = "탈퇴하시겠습니까?";
    const inputStringLabel = "다음 문자열을 입력해주세요: Codestates";
    const incorrectStringMsg = "문자열이 일치하지 않습니다!";
    const withdrawalButtonText = "회원탈퇴";

    const handleWithdrawal = () => {
        if (inputString === "Codestates") {
            deleteMemberMutation.mutate();
        } else {
            setErrorMsg(incorrectStringMsg);
            onErrorVisibility(true); // 에러가 발생했을 때 높이를 280px로 조절
        }
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{withdrawalTitle}</Title>
                <Label>{inputStringLabel}</Label>
                <PasswordInput type="text" value={inputString} onChange={e => setInputString(e.target.value)} />
                <MessageWrapper>
                    {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                </MessageWrapper>
                <WithdrawalButton onClick={handleWithdrawal}>{withdrawalButtonText}</WithdrawalButton>
            </ModalContainer>
        </ModalBackground>
    );
};

export default MemberWithdrawalModal;


interface MemberWithdrawalModalProps {
    onClose: () => void;
    onErrorVisibility: (visibility: boolean) => void;

}


// Styled Components Definitions:

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
  z-index: 100;
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  height:230px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border-radius:5px;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h2`
    font-size: 1.6rem;
    margin-bottom: 10px;
    font-weight: 400;
`;

const Label = styled.label`
    margin: 15px 0;  // 간격 조정
    font-size: 1.1rem;  // 폰트 크기 증가
    line-height: 1.5;
    color: #555;  // 색상 변경
    text-align: center;  // 텍스트 중앙 정렬
`;

const PasswordInput = styled.input`
    width: 100%;
    padding: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const MessageWrapper = styled.div`
  height: 10px;  // 에러 메시지 공간을 좀 더 확보합니다.
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WithdrawalButton = styled.button`
    padding: 10px 20px;
    background-color: darkslategray;
    color: white;
    border: 1px solid lightslategray;
    border-radius: 5px;
    cursor: pointer;
    //호버 시 밝게
    &:hover {
        background-color: rgba(47, 79, 79, 0.8); 
    }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom:5px;
`;