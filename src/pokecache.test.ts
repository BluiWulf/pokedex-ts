
import { Cache } from "./pokecache.js";
import { describe, expect, test } from "vitest";

test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500,
    },
    {
        key: "https://example.com/path",
        val: "othertestdata",
        interval: 1000,
    },
    {
        key: "https://example.com/random",
        val: "randomtestdata",
        interval: 2000,
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval * 2));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});
