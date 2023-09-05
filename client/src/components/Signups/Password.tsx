import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

// 사용자에게 보여줄 문자열을 정의하는 객체
const strings = {
    titleText: "비밀번호 설정",
    passwordLabelText: "비밀번호",
    confirmPasswordLabelText: "비밀번호 확인",
    nicknameLabelText: "닉네임",
    confirmButtonText: "확인"
};

// 비밀번호 설정 모달 컴포넌트
const PasswordSettingModal: React.FC<{ onClose: () => void, email: string }> = ({ onClose, email }) => {
    // 비밀번호, 비밀번호 확인, 닉네임에 대한 상태를 관리합니다.
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    // 각 입력값을 처리하는 핸들러 함수들
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    // 확인 버튼 클릭 시 데이터를 서버로 전송하는 함수
    const handleConfirmClick = async () => {
        try {
            const response = await axios.post('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/members', {
                email,
                name,
                password,
                confirmPassword,
            });

            if (response.status === 200) {
                console.log('Data sent successfully');
                onClose();
            } else {
                console.error('Error sending data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        // 모달의 전체 구조를 정의하는 부분
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{strings.titleText}</Title>
                <Label>{strings.passwordLabelText}</Label>
                <Input type="password" placeholder="8~16자리 비밀번호를 입력해주세요" value={password} onChange={handlePasswordChange} />
                <Label>{strings.confirmPasswordLabelText}</Label>
                <Input type="password" placeholder="비밀번호를 다시 입력해주세요" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                <Label>{strings.nicknameLabelText}</Label>
                <Input type="text" placeholder="닉네임을 입력해주세요" value={name} onChange={handleNameChange} />
                <ConfirmButton onClick={handleConfirmClick}>{strings.confirmButtonText}</ConfirmButton>
            </ModalContainer>
        </ModalBackground>
    );
};

export default PasswordSettingModal;

// 모달 배경 스타일
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

// 모달 컨테이너 스타일
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

// 모달 제목 스타일
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

// 모달 닫기 버튼 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

// 레이블 스타일
const Label = styled.label`
  align-self: flex-start;
  margin-top: 10px;
`;

// 입력 필드 스타일
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
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
