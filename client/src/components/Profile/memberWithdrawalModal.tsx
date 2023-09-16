import React, { useState } from 'react';
import styled from 'styled-components'; 
import { useDeleteMember } from '../../hooks/useDeleteMembers';

const MemberWithdrawalModal: React.FC<MemberWithdrawalModalProps> = ({ onClose }) => {

    const [inputString, setInputString] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const deleteMemberMutation = useDeleteMember();

    const withdrawalTitle = "StockHolm에서 탈퇴하시겠습니까?";
    const inputStringLabel = "다음 문자열을 입력해주세요: Codestates";
    const incorrectStringMsg = "문자열이 일치하지 않습니다!";
    const withdrawalButtonText = "회원탈퇴";

    const handleWithdrawal = () => {
        if (inputString === "Codestates/seb-45_main_008") {
            deleteMemberMutation.mutate(inputString, {
                onSuccess: () => {
                    alert('회원탈퇴 되었습니다!');
                    onClose();
                }
            });
        } else {
            setErrorMsg(incorrectStringMsg);
        }
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{withdrawalTitle}</Title>
                <Label>{inputStringLabel}</Label>
                <PasswordInput type="text" value={inputString} onChange={e => setInputString(e.target.value)} />
                {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                <WithdrawalButton onClick={handleWithdrawal}>{withdrawalButtonText}</WithdrawalButton>
            </ModalContainer>
        </ModalBackground>
    );
};

export default MemberWithdrawalModal;


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
    background-color: white;
    color: darkslategray;
    border: 1px solid lightslategray;
    border-radius: 5px;
    cursor: pointer;
`;


const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;