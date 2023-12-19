import { expect, test } from 'vitest';
import { ReadableStream } from 'stream/web';

import readNDJSONStream from './index.mjs';

test('parses an NDJSON stream correctly', async () => {
  var queue = [new TextEncoder().encode('{"foo":"bar"}\n{"ｆｏｏ":"ｂａｒ"}\n')];
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
    type: 'bytes',
  });

  const results = [];
  for await (const event of readNDJSONStream(stream)) {
    results.push(event);
  }

  expect(results.length).toBe(2);
  expect(JSON.stringify(results)).toBe('[{"foo":"bar"},{"ｆｏｏ":"ｂａｒ"}]');
});
