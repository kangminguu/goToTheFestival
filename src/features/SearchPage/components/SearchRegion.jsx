import { useSearchPageStore } from "../../../store/store";
import { regionList } from "../../../constants/regionList";

export default function SearchRegion() {
    const { region, setRegion } = useSearchPageStore();

    return (
        <div className="bg-white h-[340px] overflow-scroll rounded-[15px] shadow-[0_5px_10px_-3px_rgba(0,0,0,0.3)] mb-[120px]">
            {regionList.map((regions, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => setRegion(regions.rnum)}
                        className={`${
                            region === regions.rnum ? "bg-[#FF834350]" : null
                        } h-[60px] border-[0.1px] flex justify-center items-center`}
                    >
                        <p className="font-bold text-[16px]">
                            {regions.fullName}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
