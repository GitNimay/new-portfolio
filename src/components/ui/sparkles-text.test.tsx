// @vitest-environment happy-dom

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SparklesText } from "./sparkles-text";

describe("SparklesText", () => {
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
    vi.unstubAllGlobals();
  });

  it("renders only the label when reduced motion is preferred", () => {
    const { container } = render(<SparklesText>DevOps Engineer</SparklesText>);

    expect(screen.getByText("DevOps Engineer")).toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(0);
  });
});
