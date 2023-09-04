import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { stockOrderOpen } from "../../reducer/StockOrderSet-Reducer";
import { orderTypeBuying, orderTypeSelling } from "../../reducer/StockOrderType-Reducer";

const StockOrderBtn = (props: OwnProps) => {
  const { type } = props;
  const buttonText: string = type === "buying" ? "매수" : "매도";

  const dispatch = useDispatch();

  const handleStockOrderSet = () => {
    dispatch(stockOrderOpen());

    if (type === "buying") {
      dispatch(orderTypeBuying());
    } else {
      dispatch(orderTypeSelling());
    }
  };

  return (
    <Container>
      <Button type={type} onClick={handleStockOrderSet}>
        {buttonText}
      </Button>
    </Container>
  );
};

export default StockOrderBtn;

// type 정의
interface OwnProps {
  type: string;
}

// component 생성
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
`;

const Button = styled.div<OwnProps>`
  width: 44px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  color: ${(props) => (props.type === "buying" ? "#cc3c3a" : "#4479c2")};
  background-color: ${(props) => (props.type === "buying" ? "#fcdddb" : "#dce9fc")};

  padding-top: 2px;
  border-radius: 0.2rem;
`;
