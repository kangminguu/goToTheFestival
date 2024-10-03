/* eslint-disable react/prop-types */
import { WishFilledIcon } from "../../../components/ui/icon";
import { FestivalState } from "../../../components";
import { useWishListStore } from "../../../store/store";

export default function ImageSection({ image, detailInfo }) {
    const { wishList, addWishList, deleteWishList } = useWishListStore();

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

    const wishListContentId = wishList.map((wish) => wish.contentid); // 찜 목록에 있는 축제들의 contentid를 배열에 담기
    const isWished = wishListContentId.includes(detailInfo.contentid); // 배열에 담긴 contentid가 포함되어 있는 지 확인

    /** 찜 클릭 이벤트, 눌려져 있으면 삭제 */
    const handleOnClickWish = () => {
        !isWished ? addWishList(detailInfo) : deleteWishList(detailInfo);
    };

    return (
        <div className="relative rounded-[10px] overflow-hidden">
            <img src={image} alt="" />
            <FestivalState festivalState={festivalState} />
            <div onClick={() => handleOnClickWish()}>
                <WishFilledIcon isWished={isWished} />
            </div>
        </div>
    );
}
