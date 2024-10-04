import { CardList } from "../../components";
import RegionList from "./components/RegionList";
import { useIsDetailPageStore, useTabMenuStore } from "../../store/store";
import { useEffect } from "react";

export default function HomePage() {
    const { setIsDetailPage } = useIsDetailPageStore();
    const { tab } = useTabMenuStore();

    sessionStorage.setItem("tab", tab);

    useEffect(() => {
        setIsDetailPage(false);
    }, [setIsDetailPage]);

    return (
        <div>
            <RegionList />
            <div className="relative top-[96px] pb-[60px]">
                <CardList />
            </div>
        </div>
    );
}
