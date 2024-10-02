import { regionList } from "../constants/regionList";

const date = new Date();
const year = `${date.getFullYear()}`;
const month = `${date.getMonth() + 1}`.padStart(2, '0');
const day = `${date.getDate()}`.padStart(2, '0');
const today = year + month + day;

const KEY = import.meta.env.VITE_API_KEY2;
const baseURL = `https://apis.data.go.kr/B551011/KorService1/`;

const getListURL = `searchFestival1?serviceKey=${KEY}&_type=json&MobileOS=ETC&MobileApp=AppTest&numOfRows=500&pageNo=1&listYN=Y&arrange=A`;
const dateOpt = `&eventStartDate=${today}`;

/** 축제 리스트를 받아오는 함수 */
// 가장 최근 진행하는 순으로 정렬하기 위해 api를 한번에 받는 식으로 하였음
// 날짜를 기준으로 데이터를 받아옴, 만약 오늘 이미 데이터를 받아왔으면 세션스토리지에 저장된 데이터를 사용
const getFestivalList = async (code) => {
    const cachedData = JSON.parse(sessionStorage.getItem('cachedData'));

    if (cachedData && cachedData.date === today && Object.keys(cachedData).includes(code.toString())) {
        console.log("세션 스토리지 사용");

        return cachedData[code];
    } else {
        console.log("api 사용");

        const res = await fetch(baseURL + getListURL + dateOpt + (regionList[code].code !== "0" ? `&areaCode=${regionList[code].code}` : ""));
        const festivalList = await res.json();

        // 받아온 축제 정보를 최근 날짜 순으로 정렬
        const festivals = [...festivalList.response.body.items.item].sort((a, b) => a.eventstartdate - b.eventstartdate);

        sessionStorage.setItem("cachedData", JSON.stringify({ date: today, [code]: festivals, ...cachedData }));

        return festivals;
    }
}

const getDetailURL = `detailCommon1?serviceKey=${KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=15&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1`

/** detail 페이지에 들어갈 축제 정보를 가져오는 함수, contentid 필요 */
const getDetailFestivalInfo = async (contentId) => {
    const res = await fetch(baseURL + getDetailURL + `&contentId=${contentId}`);
    const detail = await res.json();
    const data = detail.response.body.items.item[0];

    // console.log(baseURL + getDetailURL + `&contentId=${contentId}`);

    // const data = {
    //     contentid: "3362959",
    //     contenttypeid: "15",
    //     title: "청주 디저트·베이커리 페스타",
    //     createdtime: "20240909172346",
    //     modifiedtime: "20240909172543",
    //     tel: "043-201-2056",
    //     telname: "청주시",
    //     homepage: "\u003Ca href=\"https://www.cheongju.go.kr/ktour/selectClturCntnts2019View.do?key=20326&clturCntntsNo=2141&clturCode=7&pageUnit=8&pageIndex=1&searchCnd=all&odf=nm_c\" target=\"_blank\" title=\"새창 : @@@축제 홈페이지 이동\"\u003Ewww.cheongju.go.kr\u003C/a\u003E",
    //     booktour: "",
    //     firstimage: "http://tong.visitkorea.or.kr/cms/resource/39/3362939_image2_1.JPG",
    //     firstimage2: "http://tong.visitkorea.or.kr/cms/resource/39/3362939_image3_1.JPG",
    //     cpyrhtDivCd: "Type3",
    //     areacode: "33",
    //     sigungucode: "10",
    //     cat1: "A02",
    //     cat2: "A0207",
    //     cat3: "A02070200",
    //     addr1: "충청북도 청주시 청원구 상당로 314 (내덕동)",
    //     addr2: "",
    //     zipcode: "28501",
    //     mapx: "127.4889281085",
    //     mapy: "36.6566740551",
    //     mlevel: "6",
    //     overview: "청주 디저트·베이커리 페스타는 '달콤한 도시 청주'를 주제로 개최되며, 축제기간 지역을 대표하는 디저트·베이커리 홍보 및 판매, 관련 체험 및 부대행사, 관련 학과 학생들의 지역 대표 디저트 베이커리 창작 작품 전시 이벤트, 축제와 어우러진 잔잔한 공연, 지역 대표 농특산물 브랜드 '청원생명 상생장터' 등 다채로운 행사가 진행된다."
    // }

    return data;
}

export { getFestivalList, getDetailFestivalInfo }