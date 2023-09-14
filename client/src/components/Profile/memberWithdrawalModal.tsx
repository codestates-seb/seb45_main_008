import React, { useState } from 'react';
import styled from 'styled-components'; 
import { useDeleteMember } from '../../hooks/useDeleteMembers'; // 적절한 경로로 수정


const MemberWithdrawalModal: React.FC<MemberWithdrawalModalProps> = ({ onClose }) => {

    const [password, setPassword] = useState<string>('');
    const deleteMemberMutation = useDeleteMember();

    const withdrawalTitle = "StockHolm에서 탈퇴하시겠습니까?";
    const passwordInputLabel = "비밀번호를 입력해주세요.";
    const incorrectPasswordMsg = "Incorrect password!";
    const withdrawalButtonText = "회원탈퇴";

    const handleWithdrawal = () => {
        deleteMemberMutation.mutate(password, { // 비밀번호를 서버에 전송
            onSuccess: () => {
                alert('회원탈퇴 되었습니다!');
                onClose();
            },
            onError: () => {
                alert(incorrectPasswordMsg);
            }
        });
    };
    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{withdrawalTitle}</Title>
                <Label>{passwordInputLabel}</Label>
                <PasswordInput type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <WithdrawalButton onClick={handleWithdrawal}>{withdrawalButtonText}</WithdrawalButton>
            </ModalContainer>
        </ModalBackground>
    );
};

interface MemberWithdrawalModalProps {
    onClose: () => void;

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
  z-index: 11;
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
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
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
`;

const PasswordInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const WithdrawalButton = styled.button`
    padding: 10px 20px;
    background-color: darkred;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default MemberWithdrawalModal;
