import { Token } from './types';
import { readFile, writeFile } from 'fs-extra';
import path from 'path';
import { mkdirSync } from 'fs';

export interface IStorage {
  getToken(): PromiseLike<Token | undefined>;
  setToken(token: Token): PromiseLike<void>;
}

export class MemoryStorage implements IStorage {
  token?: Token;

  async getToken() {
    return this.token;
  }

  async setToken(token: Token) {
    this.token = token;
  }
}

export class FileStorage implements IStorage {
  constructor(protected path: string) {
    mkdirSync(this.path, { recursive: true });
  }

  async getToken() {
    try {
      const token = await readFile(path.join(this.path, 'token.json'), 'utf-8');

      return JSON.parse(token);
    } catch (err) {
      // @ts-ignore
      if (err.code === 'ENOENT') {
        return undefined;
      }
      console.dir(err);

      throw err;
    }
  }

  async setToken(token: Token) {
    await writeFile(
      path.join(this.path, 'token.json'),
      JSON.stringify(token),
      'utf-8'
    );
  }
}
