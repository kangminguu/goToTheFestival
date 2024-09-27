import { CardList } from "../../components";
import RegionList from "./components/RegionList";

export default function HomePage() {
    return (
        <div>
            <RegionList />
            <CardList />
        </div>
    );
}
