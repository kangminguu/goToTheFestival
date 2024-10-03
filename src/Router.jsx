import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import NotFound from "./NotFound";

import HomePage from "./features/HomePage/HomePage";
import SearchPage from "./features/SearchPage/SearchPage";
import DetailPage from "./features/DetailPage/DetailPage";
import WishListPage from "./features/WishListPage/WishListPage";

const router = createBrowserRouter([
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
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
