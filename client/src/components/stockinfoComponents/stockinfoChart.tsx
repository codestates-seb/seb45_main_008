import { useSelector } from "react-redux";
import { RootState } from "../../store/config";
import styled from "styled-components";

const PortFolioChart = () => {
  const companyId = useSelector((state: RootState) => state.companyId);
  const InfoDatas = {
    companyIds: companyId,
    companyInfo: [
      {
        companysId: 1,
        company: {
          companyName: "삼성전자",
          companyKospi: "코스피 005930",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png",
          companySkill: {
            sk1: "스마트홈",
            sk2: "차세대이동통신",
            sk3: "자율주행",
            sk4: "VR",
            sk5: "시스템반도체",
            sk6: "폴더블폰",
          },
          companyValue: "428조 334억",
          companyRank: "코스피 1위",
          companyStock: "5,969,782,550주",
          compnayIndustrial: "하드웨어/IT장비",
          companyIndustDetail: "반도체/반도체장비",
          companyExample: "삼성전자는 1969년 설립된 기업으로 반도체, 전자 제품 제조·판매업을 영위하고 있다.",
          companyExample2: "주요 종속기업은 삼성전자로지텍, 삼성전자서비스, 삼성디스플레이, 스테코, 삼성메디슨 등이 있다.",
          companyExample3: "주요 매출은 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 IM부문에서 발생하고 있으며 반도체, CE 부문이 뒤를 잇고 있다.",
          companyExample4: "TV, 스마트폰, 반도체 및 디스플레이 패널 부문 등에서 글로벌 우위의 경쟁력을 확보하고 있으며, 메타버스와 로보틱스 시장으로 진출하기 위해 M&A를 계획하고 있다.",
          companyAsset: {
            total: "자산총계" + "4,480,005.60" + "억",
            lentRatio: "19.87" + "%",
            assetRatio: "80.13" + "%",
          },
        },
      },
      {
        companysId: 2,
        company: {
          companyName: "POSCO홀딩스",
          companyKospi: "코스피 005490",
          companyImageUrl: "https://cphoto.asiae.co.kr/listimglink/1/2022101910022873851_1666141348.png",
          companySkill: {
            sk1: "2차전지",
            sk2: "풍력",
            sk3: "LNG",
            sk4: "2차전지-소재부품",
            sk5: "폐배터리",
            sk6: "철강/철근",
          },
          companyValue: "46조 7,678억",
          companyRank: "코스피 6위",
          companyStock: "84,571,230주",
          compnayIndustrial: "소재",
          companyIndustDetail: "철강",
          companyExample: "POSCO홀딩스는 1968년 설립된 기업으로 철강재 제조·판매업을 영위하고 있다.",
          companyExample2: "주요 종속기업은 포스코경영연구원, 포스코리튬솔루션, 포스코알텍, 포스코터미날 등이 있다.",
          companyExample3: "주요 매출은 철강 생산·판매에서 발생하고 있으며 무역, E&C 부문이 뒤를 잇고 있다.",
          companyExample4: "기존의 철강 사업과 더불어 2차전지, 스마트 공장 건설 등 친환경 분야로 사업을 확장하고 있다.",
          companyAsset: {
            total: "자산총계" + "1,030,787.50" + "억",
            lentRatio: "58.09" + "%",
            assetRatio: "41.91" + "%",
          },
        },
      },
      {
        companysId: 3,
        company: {
          companyName: "셀트리온",
          companyKospi: "코스피 068270",
          companyImageUrl: "https://cdn.bosa.co.kr/news/photo/201808/2088723_134084_77.jpg",
          companySkill: {
            sk1: "바이오시밀러",
            sk2: "결핵",
            sk3: "김동연",
            sk4: "",
            sk5: "",
            sk6: "",
          },
          companyValue: "21조 6,090억",
          companyRank: "코스피 15위",
          companyStock: "146,402,770주",
          compnayIndustrial: "헬스케어",
          companyIndustDetail: "제약/건강기능식품",
          companyExample: "주요 종속기업은 셀트리온제약, Celltrion USA, Celltrion Asia Pacific PTE가 있다.",
          companyExample2: "주요 매출은 바이오의약품, 케미컬의약품 부문에서 발생하고 있다.",
          companyExample3: "당사는 상업화 완료한 바이오시밀러 제품 외에도 시장성 및 성장성 있는 다양한 후속 바이오시밀러 제품 개발에도 매진하고 있다.",
          companyExample4: "",
          companyAsset: {
            total: "자산총계" + "62,878.85" + "억",
            lentRatio: "30.14" + "%",
            assetRatio: "69.86" + "%",
          },
        },
      },
      {
        companysId: 4,
        company: {
          companyName: "에코프로",
          companyKospi: "코스닥 086520",
          companyImageUrl: "https://cdn.bizwatch.co.kr/news/photo/2023/04/24/345e448dbdb6e28b6984f96331304a98.jpg",
          companySkill: {
            sk1: "전기차",
            sk2: "2차전지",
            sk3: "탄소배출권",
            sk4: "온실가스",
            sk5: "2차전지-소재부품",
            sk6: "폐배터리",
          },
          companyValue: "24조 714억",
          companyRank: "코스닥 2위",
          companyStock: "26,627,668주",
          compnayIndustrial: "기타",
          companyIndustDetail: "지주회사/복합기업",
          companyExample: "에코프로는 1998년 10월 설립된 기업으로 지주 사업을 영위하고 있다.",
          companyExample2: "주요 종속기업은 (주)에코프로에이치엔, (주)에코프로비엠, (주)에코프로이엠 등이 있다.",
          companyExample3: "주요 매출은 종속사를 통한 전지 재료 사업 부문에서 발생하고 있다.",
          companyExample4: "",

          companyAsset: {
            total: "자산총계" + "64,883.18" + "억",
            lentRatio: "56.73" + "%",
            assetRatio: "43.27" + "%",
          },
        },
      },
      {
        companysId: 5,
        company: {
          companyName: "에코프로비엠",
          companyKospi: "코스닥 247540",
          companyImageUrl: "https://cdn.bizwatch.co.kr/news/photo/2023/04/24/345e448dbdb6e28b6984f96331304a98.jpg",
          companySkill: {
            sk1: "전기차",
            sk2: "2차전지",
            sk3: "2차전지-소재부품",
            sk4: "테슬라",
            sk5: "전구체배터리",
            sk6: "",
          },
          companyValue: "27조 8,733억",
          companyRank: "코스닥 1위",
          companyStock: "97,801,344주",
          compnayIndustrial: "건설/인프라",
          companyIndustDetail: "전기장비",
          companyExample: "에코프로비엠는 리튬이온 이차전지의 양극소재용 양극활물질을 전문적으로 제조하고 있는 기업이다.",
          companyExample2: "주요 종속기업은 ㈜에코프로이엠이 있다.",
          companyExample3: "주요 매출은 양극활물질 및 전구체 품목 판매에서 발생하고 있다.",
          companyExample4: "당사는 소형전지부터 전기자동차용 배터리를 대표하는 중대형전지 시장까지 전체 이차전지 핵심소재 시장을 선도하고 있으며, 니켈 함량 80% 이상인 하이니켈계 NCA 및 NCM 양극재 개발, 양산등 국산화에 성공하였다.",
          companyAsset: {
            total: "자산총계" + "42,682.14" + "억",
            lentRatio: "39.13" + "%",
            assetRatio: "60.87" + "%",
          },
        },
      },
      {
        companysId: 6,
        company: {
          companyName: "디와이",
          companyKospi: "코스피 013570",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/013570.png",
          companySkill: {
            sk1: "수소차",
            sk2: "자율주행",
            sk3: "지주사",
            sk4: "자동차부품",
            sk5: "",
            sk6: "",
          },
          companyValue: "1,834억",
          companyRank: "코스피 532위",
          companyStock: "26,319,633주",
          compnayIndustrial: "건설/인프라",
          companyIndustDetail: "기계",
          companyExample: "디와이는 1978년 설립된 기업으로 디와이 그룹의 지주회사이다.",
          companyExample2: "주요 종속기업은 디와이오토, 디와이이노베이트, DY AMERICA INC 등이 있다.",
          companyExample3: "주요 매출은 크레인 부문에서 발생하고 있으며 골프카 판매, 세차기 판매 등이 뒤를 잇고 있다.",
          companyExample4: "",
          companyAsset: {
            total: "자산총계" + "9,167.66" + "억",
            lentRatio: "42.91" + "%",
            assetRatio: "57.09" + "%",
          },
        },
      },
      {
        companysId: 7,
        company: {
          companyName: "쿠쿠홀딩스",
          companyKospi: "코스피 192400",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/192400.png",
          companySkill: {
            sk1: "지주사",
            sk2: "렌탈",
            sk3: "",
            sk4: "",
            sk5: "",
            sk6: "",
          },
          companyValue: "6,753억",
          companyRank: "코스피 251위",
          companyStock: "35,562,185주",
          compnayIndustrial: "생활가전/가구",
          companyIndustDetail: "가정용기기",
          companyExample: "쿠쿠홀딩스는 1978년 11월 설립된 기업으로 지주사업을 영위하고 있다.",
          companyExample2: "주요 종속기업은 쿠쿠전자 주식회사가 있다.",
          companyExample3: "주요 매출은 종속사를 통한 가전사업 부문에서 발생하고 있다.",
          companyExample4: "주요 종속회사인 쿠쿠전자(주)는 가전 제품을 생산·판매하며 전기밥솥을 주력으로 IH레인지, 멀티쿠커 등의 조리용 주방가전제품, 가습기, 에어워셔 등의 생활가전제품을 생산·판매하고 있다.",
          companyAsset: {
            total: "자산총계" + "11,629.08" + "억",
            lentRatio: "13.03" + "%",
            assetRatio: "86.97" + "%",
          },
        },
      },
      {
        companysId: 8,
        company: {
          companyName: "카카오뱅크",
          companyKospi: "코스피 323410",
          companyImageUrl:
            "data:image/png;base64,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",
          companySkill: {
            sk1: "금리인상",
            sk2: "은행",
            sk3: "카카오뱅크",
            sk4: "",
            sk5: "",
            sk6: "",
          },
          companyValue: "11조 9,430억",
          companyRank: "코스피 27위",
          companyStock: "476,767,137주",
          compnayIndustrial: "금융",
          companyIndustDetail: "은행",
          companyExample: "카카오뱅크는 2016년에 설립된 기업으로 인터넷 전문은행 사업을 영위하고 있다.",
          companyExample2: "주요 매출은 이자수익에서 대부분 발생하고 있으며, 수수료, 유가증권 평가 및 처분이익이 뒤를 잇고 있다.",
          companyExample3:
            "당사는 인터넷전문은행으로서 기본적인 여수신 상품을 포함한 은행업 상품 및 서비스를 제공하는 한편, 모바일 앱 기반의 디지털 플랫폼 사업자로서 금융업 뿐 아니라 비금융업 전반에 걸친 여러 파트너사들과 제휴하여 고객들에게 다각적인 서비스를 제공하고 있다.",
          companyExample4: "",
          companyAsset: {
            total: "자산총계" + "505,269.79" + "억",
            lentRatio: "88.37" + "%",
            assetRatio: "11.63" + "%",
          },
        },
      },
      {
        companysId: 9,
        company: {
          companyName: "한세엠케이",
          companyKospi: "코스피 069640",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/069640.png",
          companySkill: {
            sk1: "최재형",
            sk2: "패션/의류",
            sk3: "",
            sk4: "",
            sk5: "",
            sk6: "",
          },
          companyValue: "757억",
          companyRank: "코스피 740위",
          companyStock: "30,106,502주",
          compnayIndustrial: "생활용품/잡화",
          companyIndustDetail: "의류/패션잡화",
          companyExample: "주요 종속기업은 의류판매업을 영위하고 있는 중국 기업 상해상무유한공사가 있다.",
          companyExample2: "주요 매출은 백화점에서의 제품, 자회사, 지점의 제품 판매에서 발생하고 있다.",
          companyExample3: "당사는 캐주얼, 여성복, 남성복, 유아동복, 스포츠, 골프 등 복종별로 구분되는 전체 의류패션시장 중에서 시장 성장률이 높고 상대적으로 경기변동에 민감하지 않은 캐주얼시장과 골프웨어를 주요 목표시장으로 하고 있다.",
          companyExample4: "",
          companyAsset: {
            total: "자산총계" + "2,655.05" + "억",
            lentRatio: "61.74" + "%",
            assetRatio: "38.26" + "%",
          },
        },
      },
      {
        companysId: 10,
        company: {
          companyName: "KG케미",
          companyKospi: "코스피 001390",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/001390.png",
          companySkill: {
            sk1: "2차전지",
            sk2: "2차전지-소재부품",
            sk3: "수돗물",
            sk4: "요소수",
            sk5: "수자원",
            sk6: "농업",
          },
          companyValue: "5,792억",
          companyRank: "코스피 272위",
          companyStock: "68,469,040주",
          compnayIndustrial: "소재",
          companyIndustDetail: "화학",
          companyExample: "KG케미칼은 1954년 설립된 기업으로 화학, 에너지, 기타 유기화학물질 제조업을 영위하고 있다.",
          companyExample2: "주요 종속기업은 이데일리, KG동부제철, KG스틸, KG에듀원 등이 있다.",
          companyExample3: "주요 매출은 철강 사업 부문에서 발생하고 있으며, 전자결제, 프랜차이즈 수익 등이 뒤를 잇고 있다.",
          companyExample4: "화학, 에너지, 전자결제, 미디어, 금융, 요식업, 교육사업, 기타 등 다양한 산업 분야에서 경영활동을 지속하고 있으며, 종속기업간 시너지 효과를 극대화 하고 있다.",
          companyAsset: {
            total: "자산총계" + "73,639.35" + "억",
            lentRatio: "53.29" + "%",
            assetRatio: "46.71" + "%",
          },
        },
      },
      {
        companysId: 11,
        company: {
          companyName: "LG화학",
          companyKospi: "코스피 051910",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/051910.png",
          companySkill: {
            sk1: "전기차",
            sk2: "2차전지",
            sk3: "OLED",
            sk4: "바이오시밀러",
            sk5: "2차전지-소재부품",
            sk6: "LCD 부품/소재",
          },
          companyValue: "39조 375억",
          companyRank: "코스피 9위",
          companyStock: "70,592,343주",
          compnayIndustrial: "소재",
          companyIndustDetail: "화학",
          companyExample: "LG화학은 2001년 4월 설립된 기업으로 석유화학사업, 첨단소재사업, 에너지솔루션사업, 생명과학사업 등을 영위하고 있다.",
          companyExample2: "주요 종속기업은 주식회사 에너지솔루션, ㈜팜한농 등이 있으며 이외에도 다수의 국내외 종속사를 보유하고 있다.",
          companyExample3: "주요 매출은 석유화학 사업 부문에서 발생하고 있다.",
          companyExample4: "지속적인 고부가 제품 비중 확대를 통해 차별화된 제품 경쟁력을 강화하고, 친환경 소재 사업으로서 재생 플라스틱인 PCR 제품 및 바이오 기반 제품의 매출 확대뿐만 아니라 생분해성 플라스틱인 PBAT, PLA 사업화를 추진하고 있다.",
          companyAsset: {
            total: "자산총계" + "725,010" + "억",
            lentRatio: "45.37" + "%",
            assetRatio: "54.63" + "%",
          },
        },
      },
      {
        companysId: 12,
        company: {
          companyName: "현대차",
          companyKospi: "코스피 005380",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005380.png",
          companySkill: {
            sk1: "수소차",
            sk2: "자율주행",
            sk3: "전기차",
            sk4: "메타버스",
            sk5: "애플카",
            sk6: "폐배터리",
          },
          companyValue: "40조 3,390억",
          companyRank: "코스피 7위",
          companyStock: "211,531,506주",
          compnayIndustrial: "자동차",
          companyIndustDetail: "자동차",
          companyExample: "현대차는 1967년 설립된 기업으로 완성차 판매업을 영위하고 있다.",
          companyExample2: "주요 종속기업은 전북현대모터스에프씨, 현대케피코, 현대캐피탈, 현대카드 등이 있다.",
          companyExample3: "주요 매출은 완성차 판매에서 발생하고 있으며 금융 부문이 뒤를 잇고 있다.",
          companyExample4: "스마트 모빌리티 솔루션 기업으로의 성공적인 전환을 위하여 모빌리티서비스사업 기반 구축, 수소 생태계 이니셔티브 확보 등 전략 방향을 수립하여 추진하고 있다.",
          companyAsset: {
            total: "자산총계" + "4,480,005.60" + "억",
            lentRatio: "19.87" + "%",
            assetRatio: "80.13" + "%",
          },
        },
      },
      {
        companysId: 13,
        company: {
          companyName: "LG전자",
          companyKospi: "코스피 107400",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/005380.png",
          companySkill: {
            sk1: "스마트홈",
            sk2: "차세대이동통신",
            sk3: "자율주행",
            sk4: "인공지능",
            sk5: "전기차",
            sk6: "VR",
          },
          companyValue: "17조 684억",
          companyRank: "코스피 19위",
          companyStock: "163,647,814주",
          compnayIndustrial: "생활가전/가구",
          companyIndustDetail: "전자제품",
          companyExample: "LG전자는 LG전자㈜의 전자 및 정보통신 사업부문을 인적분할하여 설립된 기업이다.",
          companyExample2: "주요 종속기업은 엘지이노텍㈜, ㈜하이프라자, 엘지마그나 이파워트레인㈜가 있다.",
          companyExample3: "주요 매출은 HA사업부, HE사업부, 이노텍, BS사업부 등의 제품 및 상품 판매에서 발생하고 있다.",
          companyExample4: "",
          companyAsset: {
            total: "자산총계" + "581,604.46" + "억",
            lentRatio: "59.51" + "%",
            assetRatio: "40.49" + "%",
          },
        },
      },
      {
        companysId: 14,
        company: {
          companyName: "기아",
          companyKospi: "코스피 000270",
          companyImageUrl: "https://file.alphasquare.co.kr/media/images/stock_logo/kr/000270.png",
          companySkill: {
            sk1: "방위산업",
            sk2: "수소차",
            sk3: "자율주행",
            sk4: "전기차",
            sk5: "애플카",
            sk6: "애플페이",
          },
          companyValue: "31조 8,419억",
          companyRank: "코스피 11위",
          companyStock: "402,044,203주",
          compnayIndustrial: "자동차",
          companyIndustDetail: "자동차",
          companyExample: "기아는 1944년 설립한 완성차 생산 업체로 1999년 현대자동차에 인수되었다.",
          companyExample2: "국내는 물론 독일, 미국, 캐나다, 영국 등 해외에도 완성차 및 부품 생산공장을 보유하고 있다.",
          companyExample3: "전체 판매 비중에서 40%는 국내, 60%는 해외에서 판매되고 있으며, 매출액 제고를 위해 SUV, 승합차, 전기차 모델 등의 신차를 출시하고 있다.",
          companyExample4: "",
          companyAsset: {
            total: "자산총계" + "783,970.10" + "억",
            lentRatio: "45.23" + "%",
            assetRatio: "54.77" + "%",
          },
        },
      },
    ],
  };

  //companyAsset: {
  // total: "자산총계" + "4,480,005.60" + "억",
  // lentRatio: "19.87" + "%",
  // assetRatio: "80.13" + "%",
  //}
  type MatchingCompany = CompanyInfo | undefined;

  const matchingCompany: MatchingCompany = InfoDatas.companyInfo.find((el: CompanyInfo) => el.companysId === companyId);
  let a: string = "";
  let b: string = "";
  if (matchingCompany) {
    a = matchingCompany.company.companyAsset.assetRatio;
    b = matchingCompany.company.companyAsset.lentRatio;
  }

  return (
    <InfoChart>
      {matchingCompany && (
        <>
          <Ratio>
            <AssetRatio
              style={{
                width: `${parseInt(a)}%`,
              }}
            >
              {a}
            </AssetRatio>

            <LentRatio
              style={{
                width: `${parseInt(b)}%`,
              }}
            >
              {b}
            </LentRatio>
          </Ratio>
          <RatioText>
            <div>{ChartText.AssetRatio}</div>
            <div>{ChartText.LentRatio}</div>
          </RatioText>
        </>
      )}
    </InfoChart>
  );
};

export default PortFolioChart;

const InfoChart = styled.div`
  max-height: 400px;
`;
const ChartText = {
  LentRatio: "부채비중",
  AssetRatio: "자본비중",
};
const RatioText = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  justify-content: space-between;
  font-size: 15px;
  color: #5f5f5f;
`;
const Ratio = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  width: 360px;
  display: flex;

  text-align: center;
`;

const LentRatio = styled.div`
  height: 50px;
  padding-top: 14px;
  font-size: 13px;
  color: white;
  background-color: rgba(0, 0, 255, 0.75);
`;
const AssetRatio = styled.div`
  height: 50px;
  padding-top: 14px;
  font-size: 13px;
  color: white;
  background-color: rgba(255, 0, 0, 0.75);
`;
type CompanySkill = {
  sk1: string;
  sk2: string;
  sk3: string;
  sk4: string;
  sk5: string;
  sk6: string;
};

type CompanyAsset = {
  total: string;
  lentRatio: string;
  assetRatio: string;
};

type CompanyInfo = {
  companysId: number;
  company: {
    companyName: string;
    companyKospi: string;
    companyImageUrl: string;
    companySkill: CompanySkill;
    companyValue: string;
    companyRank: string;
    companyStock: string;
    compnayIndustrial: string;
    companyIndustDetail: string;
    companyExample: string;
    companyExample2: string;
    companyExample3: string;
    companyExample4: string;
    companyAsset: CompanyAsset;
  };
};
