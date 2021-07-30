import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Routes from "./features/routes/Routes";
import Header from "./features/header/Header";

export default function App() {
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
