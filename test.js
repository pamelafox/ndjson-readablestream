import { ReadableStream } from 'stream/web';

import readNDJSONStream from "./index.js";

var queue = [new TextEncoder().encode("{\"foo\":\"bar\"}\n{\"foo\":\"bar\"}\n")];
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


if (results.length == 2 && JSON.stringify(results) == '[{"foo":"bar"},{"foo":"bar"}]') {
  console.log("Tests passed!");
  process.exit(0);
} else {
  console.log("Tests failed!");
  process.exit(1);
}


