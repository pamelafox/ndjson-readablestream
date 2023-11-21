export default async function* (readableStream) {
    const reader = readableStream.getReader();
    let runningText = "";
    let decoder = new TextDecoder("utf-8");
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        var text = decoder.decode(value, {stream: true});
        const objects = text.split("\n");
        for (const obj of objects) {
            try {
                runningText += obj;
                let result = JSON.parse(runningText);
                yield result;
                runningText = "";
            }
            catch (e) {
                // Not a valid JSON object
            }
        }
    };
}