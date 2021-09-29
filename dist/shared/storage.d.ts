import { Token } from './types';
export interface IStorage {
    getToken(): PromiseLike<Token | undefined>;
    setToken(token: Token): PromiseLike<void>;
}
export declare class MemoryStorage implements IStorage {
    token?: Token;
    getToken(): Promise<Token | undefined>;
    setToken(token: Token): Promise<void>;
}
export declare class FileStorage implements IStorage {
    protected path: string;
    constructor(path: string);
    getToken(): Promise<any>;
    setToken(token: Token): Promise<void>;
}
