declare module 'ndjson-readablestream' {
  export default async function* myGenerator<T>(readableStream: ReadableStream): AsyncGenerator<T | any>;
}
