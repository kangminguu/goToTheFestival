/* eslint-disable react/prop-types */
import { FestivalState } from "./index";
import { WishFilledIcon } from "./ui/icon/index";
import { useWishListStore } from "../store/store";
import noImage from "../assets/noImage.png";
import { Link } from "react-router-dom";

export default function Card({ festival }) {
    /** YYYYMMDD > YYYY.MM.DD 형식으로 바꾸는 함수 */
    const dateFormat = (date) =>
        `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`;

    // 축제 이미지, 제목, 시작날짜, 종료날짜, 주소
    const image = festival.firstimage !== "" ? festival.firstimage : noImage;
    const title =
        festival.title.length > 20
            ? festival.title.slice(0, 20) + "..."
            : festival.title;
    const startDate = dateFormat(festival.eventstartdate);
    const endDate = dateFormat(festival.eventenddate);
    const address =
        festival.addr1.length > 25
            ? festival.addr1.slice(0, 25)
            : festival.addr1;

    // 오늘 날짜
    const date = new Date();
    const year = `${date.getFullYear()}`;
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const today = year + month + day;

    // 축제 진행 여부, 항상 오늘을 포함하여 이후로 조회함으로 "종료"는 있을 수 없음
    // 찜 한 것중에 "종료"가 있다면??
    const festivalState =
        today >= festival.eventstartdate
            ? today > festival.eventenddate
                ? "종료"
                : "진행중"
            : "예정";

    const { wishList, addWishList, deleteWishList } = useWishListStore();

    // 축제가 위시리스트에 있는 지 여부
    const wishListContentId = wishList.map((wish) => wish.contentid);
    const isWished = wishListContentId.includes(festival.contentid);

    /** 찜 버튼 클릭 이벤트 */
    // 찜 페이지 리랜더링 되도록
    const handleOnClickWish = (e) => {
        // 이벤트 전파 중지
        e.stopPropagation();

        !isWished ? addWishList(festival) : deleteWishList(festival);
    };

    /** 축제 카드 클릭 이벤트 */
    const handleOnClickDetail = () => {
        sessionStorage.setItem("detailInfo", JSON.stringify(festival));
    };

    return (
        <div className="mx-[16px] mb-[16px] h-[320px] relative">
            <div onClick={(e) => handleOnClickWish(e)}>
                <WishFilledIcon isWished={isWished} />
            </div>
            <Link to={`/detail/${festival.contentid}`}>
                <div onClick={() => handleOnClickDetail()}>
                    <div className="h-[240px] overflow-hidden rounded-[10px]">
                        <img
                            className="object-cover w-full h-full"
                            src={image}
                            alt=""
                        />
                    </div>
                    <FestivalState festivalState={festivalState} />
                    <p className="text-[16px] font-bold relative top-[10px]">
                        {title}
                    </p>
                    <div className="text-[12px] text-[#636363] absolute bottom-[0px]">
                        <p>
                            {startDate}~{endDate}
                        </p>
                        <p>{address}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
