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

    const progressBar = {
        날짜: "0",
        지역: "45",
        키워드: "90",
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
        console.log(searchTab);
        if (searchTab === "키워드") setSearchTab("지역");
        if (searchTab === "지역") setSearchTab("날짜");
    };

    return (
        <div>
            <div className="flex flex-col gap-[30px]">
                <div className="relative mx-[16px]">
                    <div
                        onClick={clickClosed}
                        className="absolute right-0 text-[25px]"
                    >
                        <CloseIcon />
                    </div>
                    <div className="flex justify-between items-center mt-[25px] h-[80px] w-[100%]">
                        <div className="absolute bottom-[26px] left-[12px] z-0 h-[5px] w-[calc(100%-30px)] bg-[#D9D9D9]"></div>
                        <div
                            style={{ width: `${progressBar[searchTab]}%` }}
                            className={`transition-all duration-300 ease-in-out absolute bottom-[26px] left-[12px] z-10 h-[5px] bg-[#FF8343]`}
                        ></div>

                        <div className="flex flex-col gap-[5px] items-center z-20">
                            <p className="text-[12px]">날짜</p>
                            <div className="rounded-[100%] bg-[#FF8343] w-[18px] h-[18px]"></div>
                        </div>

                        <div className="flex flex-col gap-[5px] items-center z-20">
                            <p className="text-[12px]">지역</p>
                            <div
                                className={`rounded-[100%] ${
                                    searchTab === "지역" ||
                                    searchTab === "키워드"
                                        ? "bg-[#FF8343]"
                                        : "bg-[#D9D9D9]"
                                } w-[18px] h-[18px] transition-colors duration-300`}
                            ></div>
                        </div>

                        <div className="flex flex-col gap-[5px] items-center z-20">
                            <p className="text-[12px]">키워드</p>
                            <div
                                className={`rounded-[100%] ${
                                    searchTab === "키워드"
                                        ? "bg-[#FF8343]"
                                        : "bg-[#D9D9D9]"
                                } w-[18px] h-[18px] transition-colors duration-300`}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="mx-[16px]">{steps[searchTab]}</div>

                <div
                    className={`px-[16px] max-w-[480px] w-[100%] fixed bottom-[76px] flex ${
                        searchTab === "날짜" ? "justify-end" : "justify-between"
                    }`}
                >
                    <div
                        onClick={clickPrev}
                        className={`${
                            searchTab === "날짜" ? "hidden" : "block"
                        } flex justify-center items-center w-[64px] h-[28px] rounded-[5px] bg-[#B9B9B9]`}
                    >
                        <p className="text-[#FFFFFF] text-[12px]">이전</p>
                    </div>
                    <div
                        onClick={clickNext}
                        className="flex justify-center items-center w-[64px] h-[28px] rounded-[5px] bg-[#FF8343]"
                    >
                        <p className="text-[#FFFFFF] text-[12px]">
                            {searchTab === "키워드" ? "검색" : "다음"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
