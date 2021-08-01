if (process.env.NODE_ENV !== "test" && !process.env.REACT_APP_API_URL) {
    throw new Error("env 环境找不到 API_URL");
}

const config = {
    BASE_URL: process.env.REACT_APP_API_URL,
};

export default config;
