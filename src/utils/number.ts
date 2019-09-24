export const pad_zero = (size:number) => (num:number):string => {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}