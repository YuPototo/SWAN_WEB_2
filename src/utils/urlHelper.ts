export const removeProtocol = (url: string) => {
    const url_1 = url.replace("http://", "");
    const url_2 = url_1.replace("https://", "");
    return url_2;
};

export const remove3W = (url: string) => {
    return url.replace("www.", "");
};

export const clipLongString = (s: string, len: number) => {
    if (s.length > len) {
        return s.slice(0, len) + "...";
    }
    return s;
};

export const shortenURL = (url: string, len: number) => {
    const urlWithoutProtocol = removeProtocol(url);
    const urlWithout3W = remove3W(urlWithoutProtocol);
    return clipLongString(urlWithout3W, len);
};
