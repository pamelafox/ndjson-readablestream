declare module 'ndjson-readablestream' {
  export default async function* myGenerator<T = any>(readableStream: ReadableStream): AsyncGenerator<T>;
}
