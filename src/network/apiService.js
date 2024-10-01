import { regionList } from "../constants/regionList";

const date = new Date();
const year = `${date.getFullYear()}`;
const month = `${date.getMonth() + 1}`.padStart(2, '0');
const day = `${date.getDate()}`.padStart(2, '0');
const today = year + month + day;

const KEY = import.meta.env.VITE_API_KEY2;
const baseURL = `https://apis.data.go.kr/B551011/KorService1/`;

/** 축제 리스트를 받아오는 함수 */
const getListURL = `searchFestival1?serviceKey=${KEY}&_type=json&MobileOS=ETC&MobileApp=AppTest&numOfRows=10&pageNo=1&listYN=Y&arrange=A`;
const dateOpt = `&eventStartDate=${today}`;

const getFestivalList = async (code) => {
    const res = await fetch(baseURL + getListURL + dateOpt + (regionList[code].code !== "0" ? `&areaCode=${regionList[code].code}` : ""));
    const festivalList = await res.json();

    const festivals = [...festivalList.response.body.items.item].sort((a, b) => a.eventstartdate - b.eventstartdate);

    return festivals;
}

export { getFestivalList }