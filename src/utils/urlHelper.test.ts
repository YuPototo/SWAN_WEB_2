import {
    removeProtocol,
    remove3W,
    clipLongString,
    shortenURL,
} from "./urlHelper";

describe("removeProtocol", () => {
    it("should remove http", () => {
        const result = removeProtocol("http://abc.com");
        expect(result).toBe("abc.com");
    });

    it("should remove https", () => {
        const result = removeProtocol("https://abc.com");
        expect(result).toBe("abc.com");
    });
});

describe("remove3W", () => {
    it("should remove 3W", () => {
        const result = remove3W("www.abc.com");
        expect(result).toBe("abc.com");
    });
});

describe("clipLongString", () => {
    it("should clip long url", () => {
        const result = clipLongString("12345678901234567890123456789012345678");
        expect(result).toBe("123456789012345678901234567890...");
    });
});

describe("shortenURL()", () => {
    it("should remove http", () => {
        const result = shortenURL("http://abc.com");
        expect(result).toBe("abc.com");
    });

    it("should remove https and www", () => {
        const result = shortenURL("https://www.abc.com");
        expect(result).toBe("abc.com");
    });

    it("should remove https and www and shorten url", () => {
        const result = shortenURL(
            "https://www.12345.com/12345678901234567890abc"
        );
        expect(result).toBe("12345.com/12345678901234567890...");
    });
});
