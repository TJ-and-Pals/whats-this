import {pad_zero} from "@utils/number";

export const random_int = (min:number) => (max:number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export const random_index = random_int(0);

export const random_suffix = (pad_size: number) => (max:number) => 
    pad_zero(pad_size) (random_int(1) (max + 1));

export const random_suffix_2 = random_suffix(2);

export const random_suffix_exclude = (exclude_list:Array<number>) => (pad_size: number) => (max:number) => {
    const all_numbers = new Array(max+1).fill(null).map((_, idx) => idx+1);

    const excluded_numbers = all_numbers.filter(idx => exclude_list.indexOf(idx) === -1);

    const str_numbers = excluded_numbers.map(pad_zero(pad_size));
    
    shuffle_array_mut(str_numbers);

    return str_numbers.pop();
}

export const random_suffix_exclude_2 = (exclude_list:Array<number>) => random_suffix_exclude(exclude_list) (2);

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle_array_mut = <T>(a:Array<T>):Array<T> => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const shuffle_array_clone = <T>(a:Array<T>):Array<T> => 
    shuffle_array_mut(a.slice(0));