import { useEffect } from "react";
import { CardList } from "../../components/index";
import { useIsDetailPageStore, useTabMenuStore } from "../../store/store";

export default function WishListPage() {
    const { setIsDetailPage } = useIsDetailPageStore();
    const { tab } = useTabMenuStore();

    sessionStorage.setItem("tab", tab);

    useEffect(() => {
        setIsDetailPage(false);
    }, [setIsDetailPage]);

    return (
        <div className="pb-[60px] mt-[68px]">
            <CardList />
        </div>
    );
}
