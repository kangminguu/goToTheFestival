import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import { useTabMenuStore } from "./store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
    const { tab } = useTabMenuStore();

    const navigate = useNavigate();

    useEffect(() => {
        // 새로고침 시 항상 /로 리디렉션
        if (window.performance) {
            if (
                performance.getEntriesByType("navigation")[0].type === "reload"
            ) {
                navigate("/"); // 새로고침 시 /로 이동
            }
        }
    }, [navigate]);

    return (
        <div className="max-w-[480px] mx-auto">
            <div
                className={
                    tab !== "home"
                        ? "w-[100%] h-[52px] z-50 top-0 shadow-[0_5px_10px_-5px_rgba(0,0,0,0.3)] fixed"
                        : ""
                }
            >
                <Header />
            </div>
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
