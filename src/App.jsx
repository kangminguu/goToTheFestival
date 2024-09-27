import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="max-w-[480px] mx-auto">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
