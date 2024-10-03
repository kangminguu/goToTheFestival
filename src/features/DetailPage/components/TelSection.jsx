/* eslint-disable react/prop-types */
import { CallIcon } from "../../../components/ui/icon";

export default function TelSection ({tel}) {
  return (
    <div className="flex gap-[15px] my-[10px]">
                <div className="text-[24px]">
                    <CallIcon />
                </div>
                <span className="text-[16px]">{tel}</span>
            </div>
  );
};
