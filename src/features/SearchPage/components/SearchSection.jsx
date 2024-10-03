import SearchDate from "./SearchDate";
import SearchRegion from "./SearchRegion";
import SearchKeyword from "./SearchKeyword";

import { CloseIcon } from "../../../components/ui/icon/index";
import { useSearchTabStore } from "../../../store/store";

export default function SearchSection() {
    const { searchTab, setSearchTab, setIsTab } = useSearchTabStore();

    const steps = {
        날짜: <SearchDate />,
        지역: <SearchRegion />,
        키워드: <SearchKeyword />,
    };

    const clickClosed = () => {
        setIsTab(false);
    };

    const clickNext = () => {
        if (searchTab === "날짜") setSearchTab("지역");
        if (searchTab === "지역") setSearchTab("키워드");
        if (searchTab === "키워드") clickClosed();
    };

    const clickPrev = () => {
        if (searchTab === "키워드") setSearchTab("지역");
        if (searchTab === "지역") setSearchTab("날짜");
        if (searchTab === "지역") setSearchTab("날짜");
    };

    return (
        <div className="relative m-w-[480px] w-[100%]">
            <div className="mx-[16px] flex flex-col gap-[30px]">
                <div className="relative">
                    <div
                        onClick={clickClosed}
                        className="absolute right-0 text-[25px]"
                    >
                        <CloseIcon />
                    </div>
                    <div className="flex justify-between items-center mt-[25px] h-[80px] w-[100%]">
                        <div className="flex flex-col gap-[5px] items-center">
                            <p className="text-[12px]">날짜</p>
                            <div className="rounded-[100%] bg-[#FF8343] w-[18px] h-[18px]"></div>
                        </div>
                        <div className="flex flex-col gap-[5px] items-center">
                            <p className="text-[12px]">지역</p>
                            <div
                                className={`rounded-[100%] ${
                                    searchTab === "지역" ||
                                    searchTab === "키워드"
                                        ? "bg-[#FF8343]"
                                        : "bg-[#D9D9D9]"
                                } w-[18px] h-[18px]`}
                            ></div>
                        </div>
                        <div className="flex flex-col gap-[5px] items-center">
                            <p className="text-[12px]">키워드</p>
                            <div
                                className={`rounded-[100%] ${
                                    searchTab === "키워드"
                                        ? "bg-[#FF8343]"
                                        : "bg-[#D9D9D9]"
                                } w-[18px] h-[18px]`}
                            ></div>
                        </div>
                    </div>
                </div>

                {steps[searchTab]}

                <div
                    onClick={clickPrev}
                    className={`${
                        searchTab === "날짜" ? "hidden" : "fixed"
                    } bottom-[76px] left-[16px] flex justify-center items-center w-[64px] h-[28px] rounded-[5px] bg-[#B9B9B9]`}
                >
                    <p className="text-[#FFFFFF] text-[12px]">이전</p>
                </div>
                <div
                    onClick={clickNext}
                    className="fixed bottom-[76px] right-[16px] flex justify-center items-center w-[64px] h-[28px] rounded-[5px] bg-[#FF8343]"
                >
                    <p className="text-[#FFFFFF] text-[12px]">
                        {searchTab === "키워드" ? "검색" : "다음"}
                    </p>
                </div>
            </div>
        </div>
    );
}
