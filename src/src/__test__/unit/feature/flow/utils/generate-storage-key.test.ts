import { describe, expect, it } from "vitest";

import { generateStorageKey } from "@/features/flow/utils/generate-storage-key";

describe("generateStorageKeyのテスト", () => {
  it("関数を呼び出したとき、キー文字列が生成される", () => {
    const key = generateStorageKey();

    expect(key).not.toBeNull();
    expect(typeof key).toBe("string");
  });

  it("正しいフォーマットのキー文字列が生成される", () => {
    const key = generateStorageKey();

    expect(key).toMatch(/^save-data-\d{4}-\d{2}-\d{2}$/);
  });
});
