import { parseDescription } from "./parseDescription";

describe("Parseing data", () => {
  it("should parse the string and remove any character entity references", () => {
    const str = 'The user age needs to be > 24 and < 84 for "security reason".';
    const parsedStr = parseDescription(str);

    expect(parsedStr).toBe(
      "The user age needs to be &gt; 24 and &lt; 84 for &quot;security reason&quot;."
    );
  });
});
