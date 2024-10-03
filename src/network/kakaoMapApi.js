const apiKey = import.meta.env.VITE_API_KAKAOMAP_KEY;
const restApiKey = import.meta.env.VITE_API_KAKAOMAP_REST_KEY;

export const loadKakaoMap = (containerId, options = { center: { lat: 33.450701, lng: 126.570667 }, level: 3 }) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById(containerId);
                if (container) {
                    const mapOptions = {
                        center: new window.kakao.maps.LatLng(options.center.lat, options.center.lng),
                        level: options.level,
                    };
                    const map = new window.kakao.maps.Map(container, mapOptions);
                    resolve(map); // 지도 생성 성공 시 resolve
                } else {
                    reject('Map container not found'); // 컨테이너를 찾지 못할 경우 reject
                }
            });
        };

        script.onerror = () => reject('Failed to load Kakao Map script');
    });
};

// 카테고리 검색 요청 함수
export async function searchNearbyPlaces(lat, lng, radius = 1000, category = "FD6") {
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${category}&x=${lng}&y=${lat}&radius=${radius}&sort=distance`;

    const response = await fetch(url, {
        headers: {
            Authorization: `KakaoAK ${restApiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch nearby places");
    }

    const data = await response.json();

    return data.documents.slice(0, 4); // 검색된 장소 리스트 반환
}