export const numberToPrice = (value) => {
    if(!value) return;
    let str = value.toString();
    if (str.length < 4)
        return value

    let result = '';
    const length = str.length;
    const total = Math.trunc(length / 3) + 1;
    let countDot = 1;
    while (countDot <= total) {
        let start = str.length - 3 * countDot
        let end = str.length - 3 * (countDot - 1)
        if(end === 0) break;
        if(start < 0) start = 0;
        if (result)
            result = str.substring(start, end) + ',' + result;
        else
            result = str.substring(start, end);
        countDot++;
    }
    return result

}

export const formatStringLength = (value) => {
    if (value.length < 50) return value;
    return `${value.slice(0, 50)}...`;
}