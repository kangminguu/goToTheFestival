import { useParams } from "react-router-dom";
import { getDetailFestivalInfo } from "../../network/apiService";
import { useEffect, useState } from "react";
import { useLoadingStore } from "../../store/store";

import noImage from "../../assets/noImage.png";

import {
    DetailHeader,
    ImageSection,
    DateSection,
    AdressSection,
    TelSection,
    DescriptionSection,
    MapSection,
} from "./components";

export default function DetailPage() {
    const { id } = useParams(); // URL에서 id 가져오기
    const { loading, setLoading } = useLoadingStore();
    const [detailInfo, setDetailInfo] = useState(null);

    useEffect(() => {
        const getDetailInfo = async () => {
            setLoading(true);
            setDetailInfo(await getDetailFestivalInfo(id)); // contentid 값으로 축제정보 가져오기
            setLoading(false);
        };

        getDetailInfo();
    }, [id, setLoading]);

    // 스크롤을 가장 위로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 로딩중인지 확인
    if (loading || !detailInfo) {
        return <div>축제 불러오는 중...</div>;
    }

    /** YYYYMMDD > YYYY.MM.DD 형식으로 바꾸는 함수 */
    const dateFormat = (date) =>
        `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`;

    // 제목, 이미지, 시작일, 종료일, 주소, 전화, 설명
    const title = detailInfo.title;
    const image =
        detailInfo.firstimage !== "" ? detailInfo.firstimage : noImage;
    const startDate = dateFormat(detailInfo.eventstartdate);
    const endDate = dateFormat(detailInfo.eventenddate);
    const address = detailInfo.addr1;
    const tel = detailInfo.tel;
    const description = detailInfo.overview;

    return (
        <div className="relative top-[52px] pb-[76px] mx-[16px]">
            <DetailHeader title={title} />
            <ImageSection image={image} detailInfo={detailInfo} />
            <DateSection startDate={startDate} endDate={endDate} />
            <AdressSection address={address} />
            <TelSection tel={tel} />
            <DescriptionSection description={description} />
            <MapSection detailInfo={detailInfo} />
        </div>
    );
}
