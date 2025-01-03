import type { Prettify } from './type';

type Merge<T1, T2> = Prettify<Omit<T1, keyof T2> & T2>;

type MergeArrayOfObjects<T1 extends object, Objects extends object[]> =
	Objects extends [infer T2 extends object, ...infer Rest extends object[]]
		? MergeArrayOfObjects<Merge<T1, T2>, Rest>
		: T1;

export function merge<Target extends object, Objects extends object[]>(
	target: Target,
	...objects: Objects
): MergeArrayOfObjects<Target, Objects> {
	return Object.assign(target, ...objects);
}
