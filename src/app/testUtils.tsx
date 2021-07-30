// test-utils.jsx
import React, { FC, ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import your own reducer
import authSlice from "../features/auth/authSlice";

function render(
    ui: ReactElement,
    {
        preloadedState,
        store = configureStore({
            reducer: { auth: authSlice },
            preloadedState,
        }),
        ...renderOptions
    }: any = {} // 临时方案，不知道怎么 type 这里
) {
    const Wrapper: FC = ({ children }) => {
        return <Provider store={store}>{children}</Provider>;
    };
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
