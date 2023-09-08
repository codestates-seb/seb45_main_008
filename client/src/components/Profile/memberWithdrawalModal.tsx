import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MemberWithdrawalModal: React.FC<MemberWithdrawalModalProps> = ({ onClose, memberId }) => {
    const [password, setPassword] = useState<string>('');
    const [memberPassword, setMemberPassword] = useState<string | null>(null);

    const withdrawalTitle = "StockHolm에서 탈퇴하시겠습니까?";
    const passwordInputLabel = "비밀번호를 입력해주세요.";
    const incorrectPasswordMsg = "Incorrect password!";
    const withdrawalButtonText = "회원탈퇴";

    useEffect(() => {
        axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/members/${memberId}`)
            .then(response => {
                setMemberPassword(response.data.password);
            })
            .catch(error => {
                console.error("Error fetching member password:", error);
            });
    }, [memberId]);

    const handleWithdrawal = () => {
        if (password === memberPassword) {
            axios.delete(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/members/${memberId}`)
                .then(response => {
                    if (response.status === 204) {
                        alert('회원탈퇴 되었습니다!');
                        onClose();
                    }
                })
                .catch(error => {
                    console.error('Error deleting member:', error);
                });
        } else {
            alert(incorrectPasswordMsg);
        }
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
    memberId: string;
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
