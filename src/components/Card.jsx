/* eslint-disable react/prop-types */
import { FestivalState } from "./index";
import { WishFilledIcon } from "./ui/icon/index";

export default function Card({ festival }) {
    const dateFormat = (date) =>
        `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`;

    const image = festival.firstimage;
    const title =
        festival.title.length > 20
            ? festival.title.slice(0, 20) + "..."
            : festival.title;
    const startDate = dateFormat(festival.eventstartdate);
    const endDate = dateFormat(festival.eventenddate);
    const address =
        festival.addr1.length > 25
            ? festival.addr1.slice(0, 25)
            : festival.addr1;

    return (
        <div className="mx-[16px] mb-[16px] h-[320px] relative">
            <div className="h-[240px] overflow-hidden rounded-[10px]">
                <img
                    className="object-cover w-full h-full"
                    src={image}
                    alt=""
                />
            </div>
            <FestivalState />
            <WishFilledIcon />
            <p className="text-[16px] font-bold relative top-[10px]">{title}</p>
            <div className="text-[12px] text-[#636363] absolute bottom-[0px]">
                <p>
                    {startDate}~{endDate}
                </p>
                <p>{address}</p>
            </div>
        </div>
    );
}
