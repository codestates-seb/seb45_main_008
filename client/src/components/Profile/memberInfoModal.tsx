import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({ onClose, memberId }) => {
    const [memberInfo, setMemberInfo] = useState<MemberData | null>(null);  // Use the MemberData type

    const titleText = "회원정보";
    const loadingText = "Loading...";
    const nameText = "이름: ";
    const emailText = "이메일: ";
    const createdAtText = "회원 가입 일시: ";
    const memberIdText = "회원 ID: ";

    useEffect(() => {
        // Fetch member info when the modal is opened
        axios.get<MemberData>(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/members/${memberId}`)
            .then(response => {
                setMemberInfo(response.data);
            })
            .catch(error => {
                console.error("Error fetching member info:", error);
            });
    }, [memberId]);

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{titleText}</Title>
                {memberInfo ? (
                    <div>
                        {/* Display member information */}
                        <p>{memberIdText}{memberInfo.memberId}</p>
                        <p>{nameText}{memberInfo.name}</p>
                        <p>{emailText}{memberInfo.email}</p>
                        <p>{createdAtText}{memberInfo.createdAt}</p>
                    </div>
                ) : (
                    <p>{loadingText}</p>
                )}
            </ModalContainer>
        </ModalBackground>
    );
};

interface MemberInfoModalProps {
    onClose: () => void;
    memberId: string;
}
interface MemberData {
    memberId: number;
    email: string;
    name: string;
    createdAt: string;
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

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
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

export default MemberInfoModal;
