// api data 정보 가져오기

// 그리고 card로 보내기

// 지역 리스트 받아오는거
// https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=CdhmoNQAIZLODpqE4jzF5KIKvZh6BxubAO8u4G10iDuMy3ohJU0wHhFGcNazeDN1Kpia3%2FZAWRnNSY0%2FfgqFrw%3D%3D&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json
// 지역 총 17개
// 일단 reginList.js에 객체 배열로 저장하였음

// https://apis.data.go.kr/B551011/KorService1/
// searchFestival1
// ?serviceKey=CdhmoNQAIZLODpqE4jzF5KIKvZh6BxubAO8u4G10iDuMy3ohJU0wHhFGcNazeDN1Kpia3%2FZAWRnNSY0%2FfgqFrw%3D%3D
// &numOfRows=10
// &pageNo=1
// &MobileOS=ETC
// &MobileApp=AppTest
// &_type=json
// &listYN=Y
// &arrange=A
// &eventStartDate=20240927

import { regionList } from "../constants/regionList";

const date = new Date();
const year = `${date.getFullYear()}`;
const month = `${date.getMonth() + 1}`.padStart(2, '0');
const day = `${date.getDate()}`.padStart(2, '0');
const today = year + month + day;

const KEY = import.meta.env.VITE_API_KEY;
const baseURL = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${KEY}&_type=json&MobileOS=ETC&MobileApp=AppTest&numOfRows=5&pageNo=1&listYN=Y&arrange=R`;
const dateOpt = `&eventStartDate=${today}`;

const getFestivalList = async (code) => {
    const res = await fetch(baseURL + dateOpt + (regionList[code].code !== "0" ? `&areaCode=${regionList[code].code}` : ""));
    const festivalList = await res.json();

    return [...festivalList.response.body.items.item];
}

export { getFestivalList }