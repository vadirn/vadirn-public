export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
export type UnionToIntersection<U> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(U extends any ? (k: U) => void : never) extends
	(k: infer I extends U) => void ? I : never;
