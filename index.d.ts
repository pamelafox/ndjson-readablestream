declare module 'ndjson-readablestream' {
  export default function readNDJSONStream<T = any>(readableStream: ReadableStream): AsyncGenerator<T>;
}
