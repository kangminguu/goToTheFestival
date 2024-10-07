/* eslint-disable react/prop-types */

export default function FestivalState({ festivalState }) {
    const stateBgColor = {
        "예정": "bg-[#002379]",
        "진행중": "bg-[#FF8343]",
        "종료": "bg-[#636363]",
    };

    return (
        <div
            className={`w-[64px] h-[24px] rounded-[8px] ${stateBgColor[festivalState]} absolute top-[16px] left-[16px] flex justify-center items-center`}
        >
            <span className="text-[14px] text-[#FFFFFF]">{festivalState}</span>
        </div>
    );
}
