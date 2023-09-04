import { styled } from "styled-components";

const emptyMessage: string = `현재 비교 중인 종목이 없습니다
비교하고 싶은 항목을 추가해보세요`;

const CompareList = () => {
  return (
    <Container>
      <EmptyIndicator>{emptyMessage}</EmptyIndicator>
    </Container>
  );
};

export default CompareList;

const Container = styled.div`
  flex: 1 0 0;
`;

const EmptyIndicator = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999999;
  padding-left: 18px;
  padding-right: 18px;
  white-space: pre-wrap;
  text-align: center;
  line-height: 20px;
`;
