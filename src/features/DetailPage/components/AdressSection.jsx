/* eslint-disable react/prop-types */
import { LocationIcon } from "../../../components/ui/icon";

export default function AdressSection({ address }) {
    return (
        <div className="flex gap-[15px] my-[10px]">
            <div className="text-[24px]">
                <LocationIcon />
            </div>
            <span className="text-[16px]">{address}</span>
        </div>
    );
}
