import { resultOf } from '@libs/result';
import { createClient, VercelKV } from '@vercel/kv';

type DatabaseConfig = {
	url: string;
	token: string;
};

export class Database {
	kv: VercelKV;
	constructor(config: DatabaseConfig) {
		this.kv = createClient(config);
	}

	add = (key: string, value: Record<string, string | number | boolean>) => {
		return resultOf(this.kv.lpush(key, value));
	};
}
