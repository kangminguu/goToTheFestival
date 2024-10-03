/* eslint-disable react/prop-types */
import { CalendarIcon } from "../../../components/ui/icon";

export default function DateSection({ startDate, endDate }) {
    return (
        <div className="flex gap-[15px] my-[10px]">
            <div className="text-[24px]">
                <CalendarIcon />
            </div>
            <span className="text-[16px]">{`${startDate}~${endDate}`}</span>
        </div>
    );
}
