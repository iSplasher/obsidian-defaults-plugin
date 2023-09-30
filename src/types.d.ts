declare type Unwrap<T> = T extends Array<infer U>
	? U
	: T extends Promise<infer U>
	? U
	: T extends (...args: any) => Promise<infer U>
	? U
	: T extends (...args: any) => infer U
	? U
	: T;
