import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { TopButtonIcon } from "../../../components/ui/icon/index";
import { useSearchPageStore } from "../../../store/store";

export default function SearchDate() {
    const { startDate, endDate, setStartDate, setEndDate } =
        useSearchPageStore();
    const today = new Date();

    // "YYYYMMDD" 형태의 문자열을 Date 객체로 변환하는 함수
    const parseDateString = (dateString) => {
        const year = parseInt(dateString.slice(0, 4), 10);
        const month = parseInt(dateString.slice(4, 6), 10) - 1; // 월은 0부터 시작
        const day = parseInt(dateString.slice(6, 8), 10);
        return new Date(year, month, day);
    };

    // 날짜를 "YYYYMMDD" 형태로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`; // "YYYYMMDD" 형태로 반환
    };

    // 날짜 범위 선택 시 호출될 함수
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start ? formatDate(start) : ""); // 선택한 시작일로 상태 업데이트
        setEndDate(end ? formatDate(end) : ""); // 선택한 끝일로 상태 업데이트
    };

    return (
        <div className="flex h-[340px] mb-[120px] items-center justify-center">
            <Calendar
                selectRange={true} // 날짜 범위 선택 가능
                value={[parseDateString(startDate), parseDateString(endDate)]} // 선택된 날짜 범위 표시
                onChange={handleDateChange} // 날짜 선택 시 호출되는 함수
                minDate={today} // 오늘보다 이전 날짜는 선택 불가능
                calendarType="gregory"
                className="flex border-none flex-col justify-center items-center gap-[20px] text-[16px] bg-white rounded-[15px] shadow-[0_5px_10px_-3px_rgba(0,0,0,0.3)] px-[10px] py-[20px]" // 기본 스타일을 변경
                prevLabel={
                    <span className="text-[15px] bg-[#FFFFFF]">
                        <TopButtonIcon />
                    </span>
                } // 이전 버튼
                nextLabel={
                    <span className="text-[15px] inline-block transform rotate-180">
                        <TopButtonIcon />
                    </span>
                } // 다음 버튼
                next2Label={null}
                prev2Label={null}
                tileClassName={({ date, view }) => {
                    // 날짜 선택 시 배경색과 테두리 스타일 적용
                    const start = parseDateString(startDate);
                    const end = parseDateString(endDate);

                    if (view === "month") {
                        if (date > start && date < end) {
                            return "bg-[#FF834350] text-[16px] text-[#000000]"; // 선택된 날짜들
                        }
                        if (date.getTime() === start.getTime()) {
                            return "bg-[#FF834350] text-[16px] text-[#000000] rounded-l-[10px]"; // 선택된 날짜들에 배경색과 둥근 모서리 적용
                        }
                        if (date.getTime() === end.getTime()) {
                            return "bg-[#FF834350] text-[16px] text-[#000000] rounded-r-[10px]"; // 선택된 날짜들에 배경색과 둥근 모서리 적용
                        }
                        if (date.toDateString() === today.toDateString()) {
                            return "text-[#FF8343] text-[16px] bg-transparent"; // 오늘 날짜 스타일
                        }
                    }
                    return "text-[#000000] text-[16px] bg-transparent"; // 기본 날짜 스타일
                }}
                formatDay={(locale, date) => date.getDate().toString()}
            />
        </div>
    );
}
