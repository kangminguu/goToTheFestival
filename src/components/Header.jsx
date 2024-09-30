import { LightModeIcon } from "./ui/icon/index.js";

export default function Header() {
    return (
        <div className="w-[100%] h-[52px] px-[16px] z-50 bg-[#FFFFFF] flex justify-between">
            <div className="h-[100%] flex flex-col justify-center">
                <img className="h-[24px]" src="/logo.svg" alt="" />
            </div>
            <div className="h-[100%] flex flex-col justify-center">
                <LightModeIcon />
            </div>
        </div>
    );
}
