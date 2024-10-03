import { CardList } from "../../components";
import RegionList from "./components/RegionList";
import { useIsDetailPageStore } from "../../store/store";
import { useEffect } from "react";

export default function HomePage() {
    const { setIsDetailPage } = useIsDetailPageStore();

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
