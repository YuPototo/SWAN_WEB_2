import { useEffect } from "react";
import { BrowserRouter, useLocation, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./app/hooks";

import {
    setUserStorage,
    setHasFetchLocalToken,
} from "./features/auth/authSlice";

import Routes from "./features/routes/Routes";
import Header from "./features/header/Header";

import { authApi } from "./app/services/auth";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        if (!userStorage) {
            dispatch(setHasFetchLocalToken());
            return;
        }
        const userInfo = JSON.parse(userStorage);
        if (userInfo.user.username && userInfo.token) {
            dispatch(setUserStorage(userInfo));
            dispatch(setHasFetchLocalToken());
        }
        const result = dispatch(authApi.endpoints.getUserInfo.initiate());
        return result.unsubscribe;
    }, [dispatch]);

    return (
        <>
            <Toaster />

            <BrowserRouter>
                <ScrollToTop />

                <Header />
                <div className="min-h-screen bg-gray-200 pt-5">
                    <div className="max-w-4xl mx-auto">
                        <Routes />
                    </div>
                </div>
            </BrowserRouter>
        </>
    );
}
