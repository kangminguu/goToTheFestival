import { LightModeIcon } from "./ui/icon/index.js";
import logo from "../assets/logo.svg"

export default function Header() {
    return (
        <div className="max-w-[480px] w-[100%] h-[52px] px-[16px] z-50 bg-[#FFFFFF] flex justify-between fixed top-0">
            <div className="h-[100%] flex flex-col justify-center">
                <img className="h-[24px]" src={logo} alt="" />
            </div>
            <div className="h-[100%] flex flex-col justify-center">
                <LightModeIcon />
            </div>
        </div>
    );
}
