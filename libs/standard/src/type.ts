export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type UnionToIntersection<TUnion> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(TUnion extends any ? (k: TUnion) => void : never) extends
	(k: infer I extends TUnion) => void ? I : never;

export type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>;
} : T;
