import { useRef, useState } from "react";
import { regionList } from "../../../constants/regionList";

export default function RegionList() {
    const scrollContainerRef = useRef(null);
    let isDragging = false;
    let startX;
    let scrollLeft;

    /** 선택된 지역, 초기값은 전국(전체) */
    const [selectedRegion, setSelectedRegion] = useState(regionList[0].name);

    /** 클릭 후 드레그 중 이벤트 */
    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft = scrollContainerRef.current.scrollLeft;
    };

    /** 드레그 취소 이벤트, 영역을 벗어나거나 클릭을 때거나 */
    const handleMouseLeaveOrUp = () => {
        isDragging = false;
    };

    /** 드레그 이동 이벤트 */
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    /** 지역 리스트 클릭 이벤트 */
    const handleOnClick = (region) => {
        console.log(region);
        setSelectedRegion(region); // 선택된 지역으로 변경
    };

    return (
        <div className="w-[100%] h-[44px] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.3)] select-none">
            <div
                className="flex h-[100%] w-auto overflow-x-auto no-scrollbar items-center"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveOrUp}
                onMouseUp={handleMouseLeaveOrUp}
                onMouseMove={handleMouseMove}
            >
                {Object.values(regionList).map((region, index) => {
                    return (
                        <span
                            key={index}
                            className={`text-[16px] font-bold ${
                                selectedRegion === region.name
                                    ? "text-[#FF5F00]"
                                    : "text-[#000000]"
                            } hover:text-[#FF5F00] w-auto mx-[16px] text-center flex-shrink-0`}
                            onClick={() => handleOnClick(region.name)}
                        >
                            {region.name}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
