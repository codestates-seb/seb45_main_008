// client/src/components/Signups/Password.tsx
import axios from "axios";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setMemberInfo } from "../../reducer/member/memberInfoSlice";

const strings = {
  titleText: "비밀번호 설정",
  passwordLabelText: "비밀번호",
  confirmPasswordLabelText: "비밀번호 확인",
  nicknameLabelText: "이름",
  confirmButtonText: "확인",
  passwordError: "비밀번호는 8~16자, 문자, 숫자, 특수문자를 포함해야 합니다.",
  passwordMismatch: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
};

const PasswordSettingModal: React.FC<PasswordSettingModalProps> = ({ onClose, onNext, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // 요청 중인지 확인하는 상태 변수 추가
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  // 각 입력 필드에 대한 ref를 생성합니다.
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  //비밀번호 입력창
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //비밀번호 확인 입력창
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  //이름 입력창
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  //비밀번호 유효성 검사
  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;
    return passwordRegex.test(password);
  };

  // 일반적인 오류 메시지 상태 추가
  const [generalError, setGeneralError] = useState("");

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>, target?: "confirmPassword" | "name" | "confirmButton") => {
    if (event.key === "Enter") {
      if (target === "confirmPassword") {
        confirmPasswordRef.current?.focus();
      } else if (target === "name") {
        nameRef.current?.focus();
      } else if (target === "confirmButton") {
        handleConfirmClick();
      }
    }
  };

  const handleConfirmClick = async () => {
    if (isSubmitting) {
      // 이미 요청 중이라면 추가 요청을 방지
      return;
    }
    setIsSubmitting(true); // 요청 시작 전에 상태를 '요청 중'으로 설정
    //비밀번호 유효성 에러 메시지
    if (!isValidPassword(password)) {
      setPasswordError(strings.passwordError);
      return;
    } else {
      setPasswordError("");
    }

    //비밀번호 확인 유효성 에러 메시지
    if (password !== confirmPassword) {
      setConfirmPasswordError(strings.passwordMismatch);
      return;
    } else {
      setConfirmPasswordError("");
    }
    try {
      const response = await axios.post(
        "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/members",
        {
          email,
          name,
          password,
          confirmPassword,
        },
        {
          validateStatus: function (status) {
            return status >= 200 && status < 600;
          },
        }
      );

      if (response.status === 201) {
        console.log("Data sent successfully");
        dispatch(setMemberInfo(response.data));
        onClose();
        onNext();
      } else if (response.status === 400 && response.data.code === "EMAIL_DUPLICATION") {
        setGeneralError(response.data.message);
      } else if (response.status === 404 && response.data.code === "INVALID_PASSWORD") {
        setGeneralError(JSON.stringify(response.data));
      } else if (response.status === 500) {
        setGeneralError(JSON.stringify(response.data));
      } else {
        console.error("Error sending data");
      }
      // 요청 완료 후 상태를 '요청 중 아님'으로 설정
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false); // 예외 발생 시 상태를 '요청 중 아님'으로 설정
      if (axios.isAxiosError(error)) {
        console.error("Error during data submission:", error);
        if (error.response) {
          console.error("Detailed server response:", error.response.data);
        }
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <ModalBackground>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <ModalContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{strings.titleText}</Title>
          <Label>{strings.passwordLabelText}</Label>
          <Input type="password" ref={passwordRef} placeholder="8~16자리 비밀번호를 입력해주세요" value={password} onChange={handlePasswordChange} onKeyDown={(event) => handleEnterPress(event, "confirmPassword")} />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

          <Label>{strings.confirmPasswordLabelText}</Label>
          <Input type="password" ref={confirmPasswordRef} placeholder="비밀번호를 다시 입력해주세요" value={confirmPassword} onChange={handleConfirmPasswordChange} onKeyDown={(event) => handleEnterPress(event, "name")} />
          {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}

          <Label>{strings.nicknameLabelText}</Label>
          <Input type="text" ref={nameRef} placeholder="이름을 입력해주세요" value={name} onChange={handleNameChange} onKeyDown={(event) => handleEnterPress(event, "confirmButton")} />

          {generalError && <ErrorMessage>{generalError}</ErrorMessage>}

          <ConfirmButton onClick={handleConfirmClick}>{strings.confirmButtonText}</ConfirmButton>
        </ModalContainer>
      </motion.div>
    </ModalBackground>
  );
};

export default PasswordSettingModal;

interface PasswordSettingModalProps {
  onClose: () => void;
  onNext: () => void;
  email: string;
}

// 모달 배경 스타일
const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

// 모달 컨테이너 스타일
const ModalContainer = styled.div`
  z-index: 100;
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
  background: #ffffff;
  border-radius: 5px;
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

//에러 버튼 스타일
const ErrorMessage = styled.p`
  color: #e22926;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
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

  //호버 시 밝게
  &:hover {
    background-color: rgba(47, 79, 79, 0.8);
  }
`;
