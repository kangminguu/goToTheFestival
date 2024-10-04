import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useIsDetailPageStore, useTabMenuStore } from "./store/store";

function App() {
    // const navigate = useNavigate();

    const { tab, setTab } = useTabMenuStore();
    const { isDetailPage } = useIsDetailPageStore();

    useEffect(() => {
        // 새로고침 시 항상 /로 리디렉션
        if (window.performance) {
            if (performance.getEntriesByType("navigation")[0].type === "reload")
                setTab(sessionStorage.getItem("tab"));
        }
    }, [setTab]);

    return (
        <div className="max-w-[480px] mx-auto">
            {tab === "search" && !isDetailPage ? null : (
                <div className="max-w-[480px] w-[100%] h-[52px] z-50 top-0 shadow-[0_5px_10px_-5px_rgba(0,0,0,0.3)] fixed">
                    <Header />
                </div>
            )}
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
