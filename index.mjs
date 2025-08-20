export default async function* (readableStream) {
  const reader = readableStream.pipeThrough(new TextDecoderStream('utf-8')).getReader();
  let runningText = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    for (const obj of value.split('\n')) {
      try {
        runningText += obj;
        let result = JSON.parse(runningText);
        yield result;
        runningText = '';
      } catch (e) {
        // Not a valid JSON object
      }
    }
  }
}
