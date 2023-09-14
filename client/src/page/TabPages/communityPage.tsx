//import { TabNavArea } from "./TabNavArea";

import TimeLineComponent from "../../components/communityComponents/index";
import styled from "styled-components";
export const Community = () => {
  // const [submitButton, setSubmitButton] = useState("");

  // 커뮤니티 페이지 텍스트문구 객체 정리

  return (
    <CommunityContainer>
      <TimeLineComponent />
    </CommunityContainer>
  );
};

const CommunityContainer = styled.div`
  max-height: 500px;
`;
