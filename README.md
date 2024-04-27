# ndjson-readablestream

A small JS package for reading a ReadableStream of NDJSON.

`readNDJSONStream()` accepts a [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) object,
and returns an [AsyncGenerator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator) where each yielded event is a valid JSON object.

Example usage:

```javascript
import readNDJSONStream from 'ndjson-readablestream';

const response = await fetch('/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hi, how are you?' }),
});
for await (const event of readNDJSONStream(response.body)) {
  console.log('Received', event);
}
```

Example usage in a webpage:

```html
<script src="https://cdn.jsdelivr.net/npm/ndjson-readablestream@1.0.1/dist/ndjson-readablestream.umd.js"></script>
<script>
  const response = await fetch("/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: "Hi, how are you?"})
  });
  for await (const event of readNDJSONStream(response.body)) {
      console.log("Received", event);
  }
</script>
```

For more details and examples, read my blog post on [Fetching JSON over streaming HTTP](http://blog.pamelafox.org/2023/08/fetching-json-over-streaming-http.html).

## Contributing

Install the development dependencies:

```
npm install
```

Run the tests:

```
npm test
```

Format the code:

```
npm run format
```

## Publishing a new version

These instructions are for maintainers only.

0. Create a branch
1. Bump the version in package.json using either:
   - `npm version patch`
   - `npm version minor`
   - `npm version major`
2. Run `npm install` to update package-lock.json
3. Update CHANGELOG.md with description of changes in version
4. Create a pull request
5. Once merged, checkout main and run:
   1. `npm run build`
   1. `npm login`
   1. `npm publish`
