import { useEffect } from "react";
import { getFestivalList } from "../network/apiService";
import {
    useFestivalListStore,
    useLoadingStore,
    useSelectedRegion,
} from "../store/store";
import { Card } from "./index";

export default function CardList() {
    const { festivalList, setFestivalList } = useFestivalListStore();
    const { loading, setLoading } = useLoadingStore();
    const { selectedRegion } = useSelectedRegion();

    useEffect(() => {
        const getFestival = async () => {
            setLoading(true);

            console.log(selectedRegion)

            setFestivalList(await getFestivalList(selectedRegion));

            setLoading(false);
        };

        getFestival();
    }, [setFestivalList, setLoading, selectedRegion]);

    if (loading) {
        return <div>축제 불러오는 중...</div>;
    }

    return (
        <div className="my-[16px] mb-[76px]">
            {festivalList.map((festival, index) => {
                return <Card key={index} festival={festival} />;
            })}
        </div>
    );
}
