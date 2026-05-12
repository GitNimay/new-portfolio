// @vitest-environment happy-dom

import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LazySection from "./LazySection";

type ObserverCallback = IntersectionObserverCallback;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly callback: ObserverCallback;
  readonly observe = vi.fn();
  readonly disconnect = vi.fn();
  readonly unobserve = vi.fn();

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  enter() {
    this.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }
}

describe("LazySection", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps children unmounted until the section intersects", () => {
    render(
      <LazySection fallback={<div>Loading section</div>}>
        <div>Deferred content</div>
      </LazySection>
    );

    expect(screen.getByText("Loading section")).toBeInTheDocument();
    expect(screen.queryByText("Deferred content")).not.toBeInTheDocument();

    act(() => {
      MockIntersectionObserver.instances[0].enter();
    });

    expect(screen.getByText("Deferred content")).toBeInTheDocument();
    expect(screen.queryByText("Loading section")).not.toBeInTheDocument();
  });
});
