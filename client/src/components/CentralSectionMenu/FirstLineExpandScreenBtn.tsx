import { styled } from "styled-components";

const expandLeft: string = "<";
const expandRight: string = ">";

const ExpandScreenBtn = (props: OwnProps) => {
  const { direction } = props;

  if (direction === "left") {
    return <Button direction="left">{expandLeft}</Button>;
  }

  if (direction === "right") {
    return <Button direction="right">{expandRight}</Button>;
  }
};

export default ExpandScreenBtn;

// type 정의
interface OwnProps {
  direction: string;
}

// component 생성
const Button = styled.div<OwnProps>`
  width: 43px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${(props) =>
    props.direction === "left" && "1px solid darkgray"};
  border-left: ${(props) =>
    props.direction === "right" && "1px solid darkgray"};
`;
