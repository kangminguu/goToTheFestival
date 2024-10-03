import { useSearchPageStore } from "../../../store/store";

export default function SearchKeyword() {
    const { keyword, setKeyword } = useSearchPageStore();

    return (
        <div>
            <p className="text-[16px] text-[#636363] mb-[20px]">
                검색하고 싶은 키워드를 입력하세요
            </p>
            <input
                className="w-[100%] h-[60px] rounded-[15px] shadow-[0_5px_10px_-3px_rgba(0,0,0,0.3)] text-[16px] px-[20px] py-[10px]"
                type="text"
                placeholder="ex) 불꽃, 기념"
                onChange={(e) => setKeyword(e.target.value.trim())}
                value={keyword}
            />
        </div>
    );
}
