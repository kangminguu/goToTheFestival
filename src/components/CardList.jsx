import { useEffect, useState } from "react";
import { getFestivalList, searchFestivalList } from "../network/apiService";
import {
    useFestivalListStore,
    useLoadingStore,
    useSelectedRegion,
    useTabMenuStore,
    useWishListStore,
    useSearchPageStore,
} from "../store/store";
import { Card } from "./index";
import MoveTopButton from "./ui/MoveTopButton";
// import LazyLoad from "react-lazyload"; // LazyLoad 라이브러리

export default function CardList() {
    const { festivalList, setFestivalList } = useFestivalListStore();
    const { loading, setLoading } = useLoadingStore();
    const { selectedRegion } = useSelectedRegion();
    const { tab } = useTabMenuStore();
    const { wishList } = useWishListStore();
    const { region, startDate, endDate, keyword } = useSearchPageStore();

    // const [visibleItems, setVisibleItems] = useState(5); // 한 번에 보여줄 축제 개수

    useEffect(() => {
        const getFestival = async () => {
            setLoading(true); // 로딩

            const festivals = await getFestivalList(selectedRegion); // 선택된 지역으로 api 요청, 카드 리스트 만들기
            setFestivalList(festivals);

            setLoading(false); // 로딩 끝
        };

        const searchFestival = async () => {
            setLoading(true); // 로딩

            const festivals = await searchFestivalList(
                region,
                startDate,
                endDate,
                keyword
            );
            setFestivalList(festivals);

            setLoading(false); // 로딩 끝
        };

        const getWishFestival = () => {
            setFestivalList(wishList); // 찜 목록으로 카드 리스트 만들기
        };

        if (tab === "home") getFestival(); // 홈 탭인 경우
        if (tab === "search") searchFestival(); // 홈 탭인 경우
        if (tab === "wish") getWishFestival(); // 찜 탭인 경우
    }, [
        selectedRegion,
        setFestivalList,
        setLoading,
        tab,
        region,
        startDate,
        endDate,
        keyword,
    ]); // wishList 추가하면 전체가 렌더링 됨

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (
    //             window.innerHeight + window.scrollY >=
    //             document.body.offsetHeight - 100
    //         ) {
    //             setVisibleItems((prev) => prev + 10);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    // 로딩 시 보여주는 화면
    if (loading) {
        return <div className="text-center my-4">추가 축제 불러오는 중...</div>;
    }

    return (
        <div>
            <div className="my-[16px]">
                {festivalList.map((festival, index) => {
                    return <Card key={index} festival={festival} />;
                })}
            </div>

            {/* {festivalList.slice(0, visibleItems).map((festival, index) => (
                <LazyLoad
                    key={index}
                    height={200}
                    offset={100}
                    placeholder={<div>이미지 로딩 중...</div>} // Placeholder
                >
                    <Card festival={festival} />
                </LazyLoad>
            ))} */}

            <MoveTopButton />
        </div>
    );
}
