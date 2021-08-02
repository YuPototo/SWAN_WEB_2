import ReactGA from "react-ga";

const TRACKING_ID = "UA-203467404-1";

const init = () => {
    // Enable debug mode on the local development environment
    const isDev =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    const isTest = process.env.NODE_ENV === "test";
    ReactGA.initialize(TRACKING_ID, { debug: isDev, testMode: isTest });
};

const sendEvent = (payload: ReactGA.EventArgs) => {
    ReactGA.event(payload);
};

const sendPageview = (path: string) => {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
};

const analytics = {
    init,
    sendEvent,
    sendPageview,
};

export default analytics;
