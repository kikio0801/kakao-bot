import { describe, expect, test } from "vitest";
import { stripEnvelope, stripEnvelopeFromMessage } from "./chat-sanitize.js";

describe("stripEnvelope", () => {
  test("strips directiveless envelope header", () => {
    expect(stripEnvelope("[WebChat 2024-01-01T12:00Z] Hello")).toBe("Hello");
  });

  test("strips directive tags only", () => {
    expect(stripEnvelope("Hello [[reply_to_current]] world")).toBe("Hello world");
  });

  test("strips envelope header and directive tags", () => {
    expect(stripEnvelope("[WebChat 2024-01-01T12:00Z] Hello [[reply_to_current]]")).toBe("Hello");
  });
});

describe("stripEnvelopeFromMessage", () => {
  test("removes message_id hint lines from user messages", () => {
    const input = {
      role: "user",
      content: "[WhatsApp 2026-01-24 13:36] yolo\n[message_id: 7b8b]",
    };
    const result = stripEnvelopeFromMessage(input) as { content?: string };
    expect(result.content).toBe("yolo");
  });

  test("removes message_id hint lines from text content arrays", () => {
    const input = {
      role: "user",
      content: [{ type: "text", text: "hi\n[message_id: abc123]" }],
    };
    const result = stripEnvelopeFromMessage(input) as {
      content?: Array<{ type: string; text?: string }>;
    };
    expect(result.content?.[0]?.text).toBe("hi");
  });

  test("does not strip inline message_id text that is part of a line", () => {
    const input = {
      role: "user",
      content: "I typed [message_id: 123] on purpose",
    };
    const result = stripEnvelopeFromMessage(input) as { content?: string };
    expect(result.content).toBe("I typed [message_id: 123] on purpose");
  });

  test("strips directive tags from assistant messages", () => {
    const input = {
      role: "assistant",
      content: "note [[reply_to_current]]\n[message_id: 123]",
    };
    const result = stripEnvelopeFromMessage(input) as { content?: string };
    expect(result.content).toBe("note\n[message_id: 123]");
  });

  test("strips [[reply_to_current]] and other directive tags", () => {
    const input = {
      role: "user",
      content: "Hello [[reply_to_current]] how are you? [[audio_as_voice]]",
    };
    const result = stripEnvelopeFromMessage(input) as { content?: string };
    expect(result.content).toBe("Hello how are you?");
  });

  test("strips directive tags from arrays", () => {
    const input = {
      role: "user",
      content: [{ type: "text", text: "Test [[reply_to:123]] tag" }],
    };
    const result = stripEnvelopeFromMessage(input) as {
      content?: Array<{ type: string; text?: string }>;
    };
    expect(result.content?.[0]?.text).toBe("Test tag");
  });
});
