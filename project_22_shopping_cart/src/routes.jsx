import App from "./components/App";
import Store from "./components/Store";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/store",
        element: <Store key='store-page'/>,
        errorElement: <ErrorPage />
    },
    {
        path: "/cart",
        element: <Cart key='cart-page'/>,
        errorElement: <ErrorPage />
    }
];

export default routes;