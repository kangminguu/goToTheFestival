import { useParams, useNavigate } from "react-router-dom";
import { getDetailFestivalInfo } from "../../network/apiService";
import { useEffect, useState } from "react";
import { useLoadingStore, useWishListStore } from "../../store/store";

import {
    TopButtonIcon,
    WishFilledIcon,
    CalendarIcon,
    LocationIcon,
    CallIcon,
    // CafeIcon,
    // RestaurantIcon,
} from "../../components/ui/icon/index";

import { FestivalState } from "../../components/index";
import noImage from "../../assets/noImage.png";

export default function DetailPage() {
    const { id } = useParams(); // URL에서 id 가져오기
    const { loading, setLoading } = useLoadingStore();
    const { wishList, addWishList, deleteWishList } = useWishListStore();
    const [detailInfo, setDetailInfo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getDetailInfo = async () => {
            setLoading(true);

            setDetailInfo(await getDetailFestivalInfo(id));

            setLoading(false);
        };

        getDetailInfo();
    }, [id, setLoading]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading || !detailInfo) {
        return <div>축제 불러오는 중...</div>;
    }

    // 오늘 날짜
    const date = new Date();
    const year = `${date.getFullYear()}`;
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const today = year + month + day;

    // 축제 진행 여부
    const festivalState =
        today >= detailInfo.eventstartdate
            ? today > detailInfo.eventenddate
                ? "종료"
                : "진행중"
            : "예정";

    /** YYYYMMDD > YYYY.MM.DD 형식으로 바꾸는 함수 */
    const dateFormat = (date) =>
        `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`;

    const wishListContentId = wishList.map((wish) => wish.contentid);
    const isWished = wishListContentId.includes(detailInfo.contentid);

    const handleOnClickWish = () => {
        !isWished ? addWishList(detailInfo) : deleteWishList(detailInfo);
    };

    // 이전 페이지로 이동하는 함수
    const goBack = () => {
        navigate(-1); // -1은 이전 페이지로 이동
    };

    return (
        <div className="relative top-[52px] pb-[76px] mx-[16px]">
            <div className="w-[100%] my-[16px] flex justify-center items-center">
                <div onClick={goBack} className="text-[30px] absolute left-0">
                    <TopButtonIcon />
                </div>
                <span className="text-[20px] px-[35px] text-center font-bold">
                    {detailInfo.title}
                </span>
            </div>
            <div className="relative rounded-[10px] overflow-hidden">
                <img
                    src={
                        detailInfo.firstimage !== ""
                            ? detailInfo.firstimage
                            : noImage
                    }
                    alt=""
                />
                <FestivalState festivalState={festivalState} />
                <div onClick={() => handleOnClickWish()}>
                    <WishFilledIcon isWished={isWished} />
                </div>
            </div>
            <div className="flex gap-[15px] my-[10px]">
                <div className="text-[24px]">
                    <CalendarIcon />
                </div>
                <span className="text-[16px]">{`${dateFormat(
                    detailInfo.eventstartdate
                )}~${dateFormat(detailInfo.eventenddate)}`}</span>
            </div>
            <div className="flex gap-[15px] my-[10px]">
                <div className="text-[24px]">
                    <LocationIcon />
                </div>
                <span className="text-[16px]">{detailInfo.addr1}</span>
            </div>
            <div className="flex gap-[15px] my-[10px]">
                <div className="text-[24px]">
                    <CallIcon />
                </div>
                <span className="text-[16px]">{detailInfo.tel}</span>
            </div>
            <div className="text-[14px]">
                {detailInfo.overview.split("<br>").map((content, i) => {
                    return <p key={i}>{`${content}\n`}</p>;
                })}
            </div>
        </div>
    );
}
