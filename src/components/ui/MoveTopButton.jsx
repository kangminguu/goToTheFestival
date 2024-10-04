import { TopButtonIcon } from "./icon/index";

export default function MoveTopButton() {
    const clickTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // 부드러운 스크롤 효과
        });
    };

    return (
        <div className="max-w-[480px] z-30 w-[100%] fixed bottom-[76px] flex justify-end">
            <div
                onClick={clickTop}
                className="w-[50px] h-[50px] bg-[#FF8343] rounded-[100%] mr-[16px] flex justify-center items-center"
            >
                <div className="text-[30px]  text-[#FFFFFF] transform rotate-90">
                    <TopButtonIcon />
                </div>
            </div>
        </div>
    );
}
