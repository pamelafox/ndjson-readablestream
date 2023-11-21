import { ReadableStream } from 'stream/web';

import readNDJSONStream from "./index.mjs";

var queue = [new TextEncoder().encode("{\"foo\":\"bar\"}\n{\"ｆｏｏ\":\"ｂａｒ\"}\n")];
var stream = new ReadableStream({
  pull(controller) {
    var chunk = queue.shift();
    if (chunk) {
      controller.enqueue(chunk);
    } else {
      controller.close();
    }
  },
  cancel() {},
  type: "bytes",
});

const results = [];
for await (const event of readNDJSONStream(stream)) {
  results.push(event);
}


if (results.length == 2 && JSON.stringify(results) == '[{"foo":"bar"},{"ｆｏｏ":"ｂａｒ"}]') {
  console.log("Tests passed!");
  process.exit(0);
} else {
  console.log("Tests failed!");
  process.exit(1);
}


