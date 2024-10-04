import ResultSection from "./components/ResultSection";
import SearchSection from "./components/SearchSection";

import { useSearchTabStore, useTabMenuStore } from "../../store/store";

export default function SearchPage() {
    const { isTab } = useSearchTabStore();
    const { tab } = useTabMenuStore();

    sessionStorage.setItem("tab", tab);

    return (
        <div className="mt-[16px]">
            {isTab ? <SearchSection /> : <ResultSection />}
        </div>
    );
}
