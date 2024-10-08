import { Link } from "react-router-dom";
import { HomeIcon, SearchIcon, WishIcon } from "./ui/icon/index";
import {
    useTabMenuStore,
    useSearchPageStore,
    useSearchTabStore,
} from "../store/store";

export default function Footer() {
    const { tab, setTab } = useTabMenuStore();
    const { setIsTab } = useSearchTabStore();
    const { setRegion, setStartDate, setEndDate, setKeyword } =
        useSearchPageStore();

    const handleOnClickHome = () => {
        window.scrollTo(0, 0);
        setTab("home");
        setIsTab(false);

        setRegion();
        setStartDate();
        setEndDate();
        setKeyword();
    };

    const handleOnClickSearch = () => {
        window.scrollTo(0, 0);
        setTab("search");
        setIsTab(false);

        setRegion();
        setStartDate();
        setEndDate();
        setKeyword();
    };

    const handleOnClickWish = () => {
        window.scrollTo(0, 0);
        setTab("wish");
        setIsTab(false);

        setRegion();
        setStartDate();
        setEndDate();
        setKeyword();
    };

    return (
        <div className="max-w-[480px] w-[100%] h-[60px] z-50 bg-[#FFFFFF] fixed bottom-0 flex items-center justify-center shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.3)]">
            <div className="flex gap-12">
                <Link to="/">
                    <div
                        onClick={() => handleOnClickHome()}
                        className={`text-[${
                            tab === "home" ? "#FF5F00" : "#636363"
                        }] hover:text-[#FF5F00] group w-[40px] flex flex-col items-center justify-center`}
                    >
                        <div className="text-[24px]">
                            <HomeIcon />
                        </div>
                        <span className="text-[10px]">홈</span>
                    </div>
                </Link>

                <Link to="/search">
                    <div
                        onClick={() => handleOnClickSearch()}
                        className={`text-[${
                            tab === "search" ? "#FF5F00" : "#636363"
                        }] hover:text-[#FF5F00] group w-[40px] flex flex-col items-center justify-center`}
                    >
                        <div className="text-[24px]">
                            <SearchIcon />
                        </div>
                        <span className="text-[10px]">검색</span>
                    </div>
                </Link>

                <Link to="/wish">
                    <div
                        onClick={() => handleOnClickWish()}
                        className={`text-[${
                            tab === "wish" ? "#FF5F00" : "#636363"
                        }] hover:text-[#FF5F00] group w-[40px] flex flex-col items-center justify-center`}
                    >
                        <div className="text-[24px]">
                            <WishIcon />
                        </div>
                        <span className="text-[10px]">찜</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
