export const numberToPrice = (value) => {
    if (value < 999)
        return value
    let str = '';
    while (value) {
        const temp = value % 1000;
        if (temp !== 0) str = `${Math.trunc(temp)},${str}`;
        else str = `000,${str}`;
        value = Math.trunc(value / 1000);
    }
    return str.slice(0, -1)
}