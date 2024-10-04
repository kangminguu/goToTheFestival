import {
    createBrowserRouter,
    HashRouter,
    RouterProvider,
} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import NotFound from "./NotFound";

import HomePage from "./features/HomePage/HomePage";
import SearchPage from "./features/SearchPage/SearchPage";
import DetailPage from "./features/DetailPage/DetailPage";
import WishListPage from "./features/WishListPage/WishListPage";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         errorElement: <NotFound />,
//         children: [
//             { index: true, element: <HomePage /> },
//             { path: "search/", element: <SearchPage /> },
//             { path: "detail/:id", element: <DetailPage /> },
//             { path: "wish", element: <WishListPage /> },
//         ],
//     },
// ]);

// export default function Router() {
//     return <RouterProvider router={router} />;
// }

// export default function PageRouter() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<App />}>
//                     <Route index element={<HomePage />} />
//                     <Route path="search" element={<SearchPage />} />
//                     <Route path="detail/:id" element={<DetailPage />} />
//                     <Route path="wish" element={<WishListPage />} />
//                 </Route>
//                 <Route path="*" element={<NotFound />} />{" "}
//                 {/* NotFound 페이지를 마지막에 추가 */}
//             </Routes>
//         </Router>
//     );
// }

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "search/", element: <SearchPage /> },
                { path: "detail/:id", element: <DetailPage /> },
                { path: "wish", element: <WishListPage /> },
            ],
        },
    ],
    { basename: "/goToTheFestival" }
);

export default function Router() {
    return (
        <HashRouter>
            <RouterProvider router={router} />
        </HashRouter>
    );
}
