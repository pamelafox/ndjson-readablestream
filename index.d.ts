declare module 'ndjson-readablestream' {
  interface MyObject {
    [key: string]: any;
  }

  export default async function* myGenerator(readableStream: ReadableStream): AsyncGenerator<MyObject>;
}
