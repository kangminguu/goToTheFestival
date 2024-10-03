import ResultSection from "./components/ResultSection";
import SearchSection from "./components/SearchSection";

import { useSearchTabStore } from "../../store/store";

export default function SearchPage() {
    const { isTab } = useSearchTabStore();

    return (
        <div className="mt-[16px]">
            {isTab ? <SearchSection /> : <ResultSection />}
        </div>
    );
}
