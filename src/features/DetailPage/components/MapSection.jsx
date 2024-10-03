/* eslint-disable react/prop-types */
import { loadKakaoMap, searchNearbyPlaces } from "../../../network/kakaoMapApi";
import { useEffect, useRef, useState } from "react";

import { CafeIcon, RestaurantIcon } from "../../../components/ui/icon/index";

export default function MapSection({ detailInfo }) {
    const mapContainerRef = useRef(null);

    const [restaurants, setRestaurants] = useState([]);
    const [cafes, setCafes] = useState([]);
    const [recommendResult, setRecommendResult] = useState("맛집");

    // 지도 로드 (detailInfo가 업데이트될 때마다)
    useEffect(() => {
        if (detailInfo && mapContainerRef.current) {
            const lat = detailInfo.mapy; // detailInfo에서 좌표값을 가져옴
            const lng = detailInfo.mapx; // detailInfo에서 좌표값을 가져옴

            loadKakaoMap(mapContainerRef.current.id, {
                center: { lat, lng }, // 좌표값으로 지도 중심 설정
                level: 4,
            })
                .then((map) => {
                    console.log("Map loaded:", map);
                    // 마커 추가
                    const markerPosition = new kakao.maps.LatLng(lat, lng); // 좌표값으로 LatLng 객체 생성
                    const marker = new kakao.maps.Marker({
                        position: markerPosition, // 마커의 위치
                    });

                    marker.setMap(map); // 마커를 지도에 표시
                })
                .catch((error) => {
                    console.error("Failed to load map:", error);
                });

            // 반경 1000m 내의 맛집 검색
            searchNearbyPlaces(lat, lng, 1000, "FD6").then((places) => {
                setRestaurants(places); // 맛집 리스트 저장
            });

            // 반경 1000m 내의 카페 검색
            searchNearbyPlaces(lat, lng, 1000, "CE7").then((places) => {
                setCafes(places); // 카페 리스트 저장
            });
        }
    }, [detailInfo]); // detailInfo가 업데이트될 때마다 호출

    // const meterToKilometer = (meter) => {

    // }

    const handleOnClickRestaurant = () => {
        setRecommendResult("맛집");
    };

    const handleOnClickCafe = () => {
        setRecommendResult("카페");
    };

    return (
        <div className="my-[30px]">
            <p className="text-[16px] font-bold my-[10px]">주변 정보</p>
            <div className="relative">
                <div
                    onClick={handleOnClickRestaurant}
                    className="absolute flex justify-center items-center z-40 top-[16px] right-[16px] w-[56px] h-[24px] bg-[#FFFFFF] active:bg-[#ededed] rounded-[8px] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.3)]"
                >
                    <p className="text-[12px]">맛집</p>
                </div>
                <div
                    onClick={handleOnClickCafe}
                    className="absolute flex justify-center items-center z-40 top-[56px] right-[16px] w-[56px] h-[24px] bg-[#FFFFFF] active:bg-[#ededed] rounded-[8px] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.3)]"
                >
                    <p className="text-[12px]">카페</p>
                </div>
                <div
                    ref={mapContainerRef}
                    id="map"
                    className="w-[100%] h-[253px] z-10"
                />
            </div>

            <p className="text-[16px] font-bold mt-[30px] my-[10px]">
                주변 {recommendResult} 검색 결과
            </p>
            <div className="grid grid-cols-2 gap-[15px]">
                {(recommendResult === "맛집" ? restaurants : cafes).map(
                    (place) => (
                        <a
                            key={place.id}
                            href={place.place_url}
                            target="_blank"
                            className="h-[48px] w-[112px] flex flex-col items-center justify-center gap-[3px] bg-[#FFFFFF] rounded-[8px] shadow-[0_5px_10px_-3px_rgba(0,0,0,0.3)]"
                        >
                            <div className="flex w-[100px] items-center gap-[5px]">
                                <div className="text-[12px]">
                                    {recommendResult === "맛집" ? (
                                        <RestaurantIcon />
                                    ) : (
                                        <CafeIcon />
                                    )}
                                </div>
                                <p className="text-[12px] font-bold">
                                    {place.place_name.length > 5
                                        ? place.place_name.slice(0, 5) + "..."
                                        : place.place_name}
                                </p>
                            </div>
                            <p className="w-[100px] text-[12px] text-[#6D6D6D]">
                                축제로 부터 {place.distance}m
                            </p>
                        </a>
                    )
                )}
            </div>
        </div>
    );
}
