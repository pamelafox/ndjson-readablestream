declare module 'ndjson-readablestream' {
  export default function <T = any>(readableStream: ReadableStream): AsyncGenerator<T>;
}
