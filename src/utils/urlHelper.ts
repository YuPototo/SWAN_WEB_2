export const removeProtocol = (url: string) => {
    const url_1 = url.replace("http://", "");
    const url_2 = url_1.replace("https://", "");
    return url_2;
};

export const remove3W = (url: string) => {
    return url.replace("www.", "");
};

export const clipLongString = (s: string) => {
    if (s.length > 30) {
        return s.slice(0, 30) + "...";
    }
    return s;
};

export const shortenURL = (url: string) => {
    const urlWithoutProtocol = removeProtocol(url);
    const urlWithout3W = remove3W(urlWithoutProtocol);
    return clipLongString(urlWithout3W);
};
