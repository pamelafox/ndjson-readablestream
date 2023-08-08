declare module "index.mjs" {
    interface MyObject {
        [key: string]: any;
    }
  
    export default async function* myGenerator(readableStream: ReadableStream): AsyncGenerator<MyObject>;
}