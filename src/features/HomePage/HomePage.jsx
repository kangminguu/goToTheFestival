import { CardList } from "../../components";
import RegionList from "./components/RegionList";

export default function HomePage() {
    return (
        <div>
            <RegionList />
            <div className="relative top-[96px] pb-[60px]">
                <CardList />
            </div>
        </div>
    );
}
