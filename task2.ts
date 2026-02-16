/* eslint-disable @typescript-eslint/no-unused-vars */
// Написать класс Cache

class Cache {
  private cache: Record<string, unknown> = {};

  constructor(private readonly fn: (...args: unknown[]) => unknown) {}

  call(...args: unknown[]) {
    const key = this.fn.toString();
    if (key in this.cache) {
      return this.cache[key];
    }
    this.cache[key] = this.fn(...args);
    return this.cache[key];
  }

  clear(): void {}

  get size(): number {
    return Object.keys(this.cache).length;
  }
}

const func = new Cache(() => Math.random());

console.log(func.call());
console.log(func.call());
console.log(func.size);
