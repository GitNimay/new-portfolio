// @vitest-environment happy-dom

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TextScramble } from "./text-scramble";

describe("TextScramble", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders static text without scheduling scramble work when reduced motion is preferred", () => {
    const intervalSpy = vi.spyOn(window, "setInterval");

    render(<TextScramble>Fast smooth text</TextScramble>);

    expect(screen.getByText("Fast smooth text")).toBeInTheDocument();
    expect(intervalSpy).not.toHaveBeenCalled();
  });
});
