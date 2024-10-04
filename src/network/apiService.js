import { regionList } from "../constants/regionList";

const date = new Date();
const year = `${date.getFullYear()}`;
const month = `${date.getMonth() + 1}`.padStart(2, '0');
const day = `${date.getDate()}`.padStart(2, '0');
const today = year + month + day;

const KEY = import.meta.env.VITE_API_KEY;

const baseURL = `https://apis.data.go.kr/B551011/KorService1/`;
const getListURL = `searchFestival1?serviceKey=${KEY}&_type=json&MobileOS=ETC&MobileApp=AppTest&numOfRows=500&pageNo=1&listYN=Y&arrange=A`;
const dateOpt = `&eventStartDate=${today}`;
const getDetailURL = `detailCommon1?serviceKey=${KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=15&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1`
const getDateURL = `detailIntro1?serviceKey=${KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=15&numOfRows=10&pageNo=1`

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

const searchFestivalList = async (region, startDate, endDate, keyword) => {
    console.log("api 사용");

    const res = await fetch(baseURL + getListURL + `&eventStartDate=${startDate}&eventEndDate=${endDate}` + (regionList[region].code !== "0" ? `&areaCode=${regionList[region].code}` : ""));
    const festivalList = await res.json();

    // 키워드로 필터링
    let festivals = [...festivalList.response.body.items.item].filter(festival => festival.title.includes(keyword));

    // 받아온 축제 정보를 최근 날짜 순으로 정렬
    festivals = [...festivals].sort((a, b) => a.eventstartdate - b.eventstartdate);

    return festivals;
}

/** detail 페이지에 들어갈 축제 정보를 가져오는 함수, contentid 필요 */
const getDetailFestivalInfo = async (contentId) => {
    const res_detailURL = await fetch(baseURL + getDetailURL + `&contentId=${contentId}`);
    const res_DateURL = await fetch(baseURL + getDateURL + `&contentId=${contentId}`);

    const data_detail = await res_detailURL.json();
    const data_date = await res_DateURL.json();

    const festivalInfo = Object.assign({}, data_detail.response.body.items.item[0], data_date.response.body.items.item[0]);

    return festivalInfo;
}

export { getFestivalList, getDetailFestivalInfo, searchFestivalList }