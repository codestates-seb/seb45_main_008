import { useSelector, useDispatch } from "react-redux";
import { setCompareStock } from "../../reducer/CompareChart-Reducer";
import { StateProps } from "../../models/stateProps";
import { styled } from "styled-components";

const CompareList = (props: OwnProps) => {
  const { corpName, compareCompanyId } = props;

  //🔴 확인 직업
  //   const compareInfo = useSelector((state: StateProps) => state.compareChart);
  //   console.log(compareInfo);
  //

  const dispatch = useDispatch();
  const currentCompanyid = useSelector((state: StateProps) => state.companyId);

  const handleSelectCompareStock = () => {
    if (currentCompanyid === compareCompanyId) {
      return;
    }

    dispatch(setCompareStock(compareCompanyId));
  };

  return <Contianer onClick={handleSelectCompareStock}>{corpName}</Contianer>;
};
export default CompareList;

interface OwnProps {
  corpName: string;
  compareCompanyId: number;
}

const Contianer = styled.div``;
