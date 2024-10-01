/* eslint-disable react/prop-types */

export default function FestivalState({ festivalState }) {
    return (
        <div
            className={`w-[64px] h-[24px] rounded-[8px] ${
                festivalState !== "종료" ? "bg-[#FF8343]" : "bg-[#636363]"
            } absolute top-[16px] left-[16px] flex justify-center items-center`}
        >
            <span className="text-[14px] text-[#FFFFFF]">{festivalState}</span>
        </div>
    );
}
