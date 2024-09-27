import { HomeIcon, SearchIcon, WishIcon } from "./ui/icon/index";

export default function Footer() {
    return (
        <div className="max-w-[480px] w-[100%] h-[60px] fixed bottom-0 flex items-center justify-center shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.3)]">
            <div className="flex gap-12">
                <div className="group w-[40px] flex flex-col items-center justify-center">
                    <HomeIcon />
                    <span className="text-[10px] text-[#636363] group-hover:text-[#FF5F00]">
                        홈
                    </span>
                </div>
                <div className="group w-[40px] flex flex-col items-center justify-center">
                    <SearchIcon />
                    <span className="text-[10px] text-[#636363] group-hover:text-[#FF5F00]">
                        검색
                    </span>
                </div>
                <div className="group w-[40px] flex flex-col items-center justify-center">
                    <WishIcon />
                    <span className="text-[10px] text-[#636363] group-hover:text-[#FF5F00]">
                        찜
                    </span>
                </div>
            </div>
        </div>
    );
}
