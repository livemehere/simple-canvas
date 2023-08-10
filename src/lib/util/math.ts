export function randomBetween(min:number, max:number, isInt:boolean = false) {
    const randomValue  = Math.random() * (max - min + 1) + min;
    if (isInt) {
        return Math.floor(randomValue);
    }
    return Math.random() * (max - min) + min;
}