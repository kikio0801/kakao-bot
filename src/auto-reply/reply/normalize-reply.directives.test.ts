import { describe, expect, test } from "vitest";
import { normalizeReplyPayload } from "./normalize-reply.js";

describe("normalizeReplyPayload with directives", () => {
  test("propagates [[reply_to_current]] as replyToCurrent: true", () => {
    const input = { text: "Hello [[reply_to_current]]" };
    const result = normalizeReplyPayload(input);
    expect(result).not.toBeNull();
    expect(result?.text).toBe("Hello");
    expect(result?.replyToCurrent).toBe(true);
    expect(result?.replyToTag).toBeUndefined(); // check if this needs to be set? types.ts says replyToTag?: boolean
  });

  test("propagates [[reply_to:123]] as replyToId: '123'", () => {
    const input = { text: "Hello [[reply_to:123]]" };
    const result = normalizeReplyPayload(input);
    expect(result).not.toBeNull();
    expect(result?.text).toBe("Hello");
    expect(result?.replyToId).toBe("123");
  });

  test("propagates [[audio_as_voice]] as audioAsVoice: true", () => {
    const input = { text: "Hello [[audio_as_voice]]" };
    const result = normalizeReplyPayload(input);
    expect(result).not.toBeNull();
    expect(result?.text).toBe("Hello [[audio_as_voice]]"); // audio tag is NOT stripped by default in normalize-reply
    expect(result?.audioAsVoice).toBe(true);
  });
});
