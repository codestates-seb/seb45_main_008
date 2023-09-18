import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { changeLeftScreen, changeRightScreen } from "../../reducer/ExpandScreen-Reducer";

const expandLeft: string = "<";
const expandRight: string = ">";

const ExpandScreenBtn = (props: OwnProps) => {
  const { direction } = props;

  const dispatch = useDispatch();

  const handleChangeLeftScreen = () => {
    dispatch(changeLeftScreen());
  };

  const handleChangeRightScreen = () => {
    dispatch(changeRightScreen());
  };

  if (direction === "left") {
    return (
      <Button direction="left" onClick={handleChangeLeftScreen}>
        {expandLeft}
      </Button>
    );
  }

  if (direction === "right") {
    return (
      <Button direction="right" onClick={handleChangeRightScreen}>
        {expandRight}
      </Button>
    );
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
  color: black;
  font-size: 22px;
  border-right: ${(props) => props.direction === "left" && "1px solid black"};
  border-left: ${(props) => props.direction === "right" && "1px solid black"};
`;
