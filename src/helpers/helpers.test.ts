import pluralize from "./pluralize";
import randHash from "./randHash";
import responseToCamelCase from "./responseToCamelCase";
import secondsToHms from "./secondsToHms";
import toCamelCase from "./toCamelCase";

describe("pluralize", () => {
  it("Correctly modify the string", () => {
    expect(pluralize(0, "cat")).toEqual("cats");
    expect(pluralize(1, "cat")).toEqual("cat");
    expect(pluralize(2, "cat")).toEqual("cats");
  });
});

describe("randHash", () => {
  it("Create rand string", () => {
    const hash1 = randHash();
    const hash2 = randHash();
    expect(typeof hash1).toEqual("string");
    expect(hash1.length).toBeGreaterThan(8);
    expect(typeof hash2).toEqual("string");
    expect(hash2.length).toBeGreaterThan(8);
    expect(hash1).not.toMatch(hash2);
  });
});

describe("responseToCamelCase", () => {
  it("responseToCamelCase should transform response object", () => {
    const response = {
      first_name: "James",
      last_name: "Bond",
      age: "30.5",
    };
    expect(responseToCamelCase(response)).toEqual({
      firstName: "James",
      lastName: "Bond",
      age: 30.5,
    });
  });
});

describe("secondsToHms", () => {
  it("secondsToHms converts seconds to HH:mm format", () => {
    expect(secondsToHms(10)).toMatch("10 seconds");
    expect(secondsToHms(80)).toMatch("1 minute, 20 seconds");
    expect(secondsToHms(12385)).toMatch("3 hours, 26 minutes, 25 seconds");
    expect(secondsToHms(12385, "medium")).toMatch("3 hours, 26 min, 25 sec");
    expect(secondsToHms(12385, "short")).toMatch("3h, 26m, 25s");
    expect(secondsToHms(12385, "short", " /")).toMatch("3h / 26m / 25s");
    expect(secondsToHms(12385, "short", " /", "s m h")).toMatch(
      "25s / 26m / 3h"
    );
  });
});

describe("toCamelCase", () => {
  it("toCamelCase transform sinput string", () => {
    expect(toCamelCase("to_camel_case")).toMatch("toCamelCase");
  });
});
