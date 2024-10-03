import {
    CalendarIcon,
    LocationIcon,
    CloseIcon,
} from "../../../components/ui/icon/index";
import { regionList } from "../../../constants/regionList";
import { CardList } from "../../../components";
import {
    useIsDetailPageStore,
    useSearchPageStore,
    useSearchTabStore,
} from "../../../store/store";
import { useEffect } from "react";

export default function ResultSection() {
    const { setIsDetailPage } = useIsDetailPageStore();
    const { setIsTab, setSearchTab } = useSearchTabStore();
    const {
        region,
        startDate,
        endDate,
        keyword,
        setRegion,
        setStartDate,
        setEndDate,
        setKeyword,
    } = useSearchPageStore();

    const makeDateForm = (date) => {
        return `${date.slice(4, 6)}.${date.slice(6)}`;
    };

    useEffect(() => {
        setIsDetailPage(false);
        // setRegion();
        // setStartDate();
        // setEndDate();
        // setKeyword();
    }, [setIsDetailPage, setRegion, setStartDate, setEndDate, setKeyword]);

    const clickXButton = () => {
        setKeyword("");
    };

    const clickCalendar = () => {
        setIsTab(true);
        setSearchTab("날짜");
    };

    const clickRegion = () => {
        setIsTab(true);
        setSearchTab("지역");
    };

    const clickKeyword = () => {
        setIsTab(true);
        setSearchTab("키워드");
    };

    return (
        <div className="mb-[76px]">
            <div className="mx-[16px]">
                <div className="flex gap-[16px]">
                    <div
                        onClick={clickCalendar}
                        className="relative flex justify-start items-center h-[40px] w-[100%] max-w-[226px] bg-[#FFFFFF] rounded-[8px] shadow-[0_5px_10px_-3px_rgba(0,0,0,0.3)]"
                    >
                        <div className="text-[16px] text-[#636363] ml-[10px]">
                            <CalendarIcon />
                        </div>
                        <p className="text-[12px] text-[#636363] ml-[10px]">
                            {`${makeDateForm(startDate)} ~ ${makeDateForm(
                                endDate
                            )}`}
                        </p>
                    </div>

                    <div
                        onClick={clickRegion}
                        className="relative flex justify-start items-center h-[40px] w-[100%] max-w-[226px] bg-[#FFFFFF] rounded-[8px] shadow-[0_5px_10px_-3px_rgba(0,0,0,0.3)]"
                    >
                        <div className="text-[16px] text-[#636363] ml-[10px]">
                            <LocationIcon />
                        </div>
                        <p className="text-[12px] text-[#636363] ml-[10px]">
                            {regionList[region].fullName}
                        </p>
                    </div>
                </div>

                <div
                    onClick={clickKeyword}
                    className="relative flex items-center h-[40px] w-[100%] max-w-[448px] mt-[16px] bg-[#FFFFFF] rounded-[8px] shadow-[0_5px_10px_-3px_rgba(0,0,0,0.3)]"
                >
                    <p className="w-[100%] text-[16px] text-[#636363] ml-[20px] mr-[30px]">
                        {keyword}
                    </p>
                    <div
                        onClick={clickXButton}
                        className="text-[20px] text-[#636363] absolute right-[10px]"
                    >
                        <CloseIcon />
                    </div>
                </div>
            </div>
            <CardList />
        </div>
    );
}
