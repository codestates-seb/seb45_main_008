import { styled } from "styled-components";

const volumeSettingTitle: string = "수량";
const maximumVolumeText01: string = "최대";
const maximumVolumeText02: string = "주";

const percentageBtnText01: string = "10%";
const percentageBtnText02: string = "25%";
const percentageBtnText03: string = "50%";
const percentageBtnText04: string = "100%";

// dummyData
const dummyMaximum: number = 203;

const VolumeSetting = () => {
  return (
    <Container>
      <TitleContainer>
        <div className="Title">{volumeSettingTitle}</div>
        <div className="MaximumVolumeContainer">
          <span>{maximumVolumeText01}</span>
          <span className="maximumVolume">{dummyMaximum}</span>
          <span>{maximumVolumeText02}</span>
        </div>
      </TitleContainer>
      <VolumeSettingBox>
        <VolumeController />
        <div className="DirectionContainer">
          <button className="VolumeUp">&#8896;</button>
          <button className="VolumeDown">&#8897;</button>
        </div>
      </VolumeSettingBox>
      <PercentageBox>
        <button>{percentageBtnText01}</button>
        <button>{percentageBtnText02}</button>
        <button>{percentageBtnText03}</button>
        <button>{percentageBtnText04}</button>
      </PercentageBox>
    </Container>
  );
};

export default VolumeSetting;

const Container = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 46px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;

  .Title {
    padding-left: 5px;
    font-size: 13px;
    color: #999999;
  }

  .MaximumVolumeContainer {
    display: flex;
    flex-direction: row;
    gap: 3px;

    & span {
      font-size: 14px;
      color: #999999;
    }

    .maximumVolume {
      color: #ed2926;
    }
  }
`;

const VolumeSettingBox = styled.div`
  display: flex;
  flex-direction: row;

  .DirectionContainer {
    display: flex;
    flex-direction: column;

    & button {
      width: 31px;
      height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      border: 1px solid darkgray;
      border-radius: 0%;

      &.VolumeUp {
        border-bottom: none;
        border-radius: 0 0.2rem 0 0;
      }

      &.VolumeDown {
        border-radius: 0 0 0.2rem 0;
      }
    }
  }
`;

const VolumeController = styled.input`
  flex: 1 0 0;
  height: 30px;
  border: 1px solid darkgray;
  border-right: none;
  border-radius: 0.2rem 0 0 0.2rem;
`;

const PercentageBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;

  & button {
    width: 56px;
    height: 28px;
    border: none;
    border-radius: 0.2rem;
  }
`;
