const secondToMinute = (second: number) => {
    return Math.floor(second / 60);
};

const secondToHour = (second: number) => {
    return Math.floor(second / 3600);
};

const secondToDay = (second: number) => {
    return Math.floor(second / 86400);
};

const getDateDiff = (dateOne: Date, dateTwo: Date) => {
    const dateDiffInSecond = (dateTwo.getTime() - dateOne.getTime()) / 1000;

    const secondUpperLimit = 60;
    const minuteUpperLimit = 3600;
    const hourUpperLimit = 86400;
    if (dateDiffInSecond < secondUpperLimit) {
        const num = Math.floor(dateDiffInSecond);
        return `${num}秒前`;
    } else if (dateDiffInSecond < minuteUpperLimit) {
        const num = secondToMinute(dateDiffInSecond);
        return `${num}分钟前`;
    } else if (dateDiffInSecond < hourUpperLimit) {
        const num = secondToHour(dateDiffInSecond);
        return `${num}小时前`;
    } else {
        const num = secondToDay(dateDiffInSecond);
        return `${num}天前`;
    }
};

export const getTimeToNow = (dateString: string) => {
    return getDateDiff(new Date(dateString), new Date());
};
