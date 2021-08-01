import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./app/hooks";

import { setUserStorage } from "./features/auth/authSlice";

import Routes from "./features/routes/Routes";
import Header from "./features/header/Header";

export default function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        if (!userStorage) {
            return;
        }
        const userInfo = JSON.parse(userStorage);
        if (userInfo.user.username && userInfo.token) {
            dispatch(setUserStorage(userInfo));
        }
    }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Toaster />

            <BrowserRouter>
                <Header />
                <div className="min-h-screen bg-gray-200 pt-2 sm:px-5 md:px-28 lg:px-40">
                    <Routes />
                </div>
            </BrowserRouter>
        </>
    );
}
