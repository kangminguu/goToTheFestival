import { useEffect } from "react";
import { CardList } from "../../components/index";
import { useIsDetailPageStore } from "../../store/store";

export default function WishListPage() {
    const { setIsDetailPage } = useIsDetailPageStore();

    useEffect(() => {
        setIsDetailPage(false);
    }, [setIsDetailPage]);

    return (
        <div className="pb-[60px] mt-[68px]">
            <CardList />
        </div>
    );
}
