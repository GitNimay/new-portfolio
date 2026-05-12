// @vitest-environment happy-dom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GitHubStats from "./GitHubStats";

vi.mock("@/context/MagicBackgroundContext", () => ({
  useMagicBackground: () => ({ isMagicActive: false }),
}));

vi.mock("framer-motion", async () => {
  const React = await import("react");
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: new Proxy(
      {},
      {
        get:
          () =>
          ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
            const domProps = { ...props } as React.HTMLAttributes<HTMLElement> & Record<string, unknown>;
            delete domProps.initial;
            delete domProps.animate;
            delete domProps.exit;
            delete domProps.transition;
            delete domProps.viewport;
            delete domProps.whileInView;

            return <div {...domProps}>{children}</div>;
          },
      }
    ),
  };
});

const renderWithClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <GitHubStats />
    </QueryClientProvider>
  );
};

describe("GitHubStats", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GITHUB_TOKEN", "bad-token");
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string, init?: RequestInit) => {
        if (init?.method === "POST") {
          return Promise.resolve({ ok: false } as Response);
        }

        if (url.includes("/repos")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]),
          } as Response);
        }

        return Promise.reject(new Error(`Unhandled request: ${url}`));
      })
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("keeps the section visible when GitHub GraphQL data fails", async () => {
    renderWithClient();

    await waitFor(() => {
      expect(screen.getByText("GitHub contribution data is temporarily unavailable.")).toBeInTheDocument();
    }, { timeout: 4000 });

    expect(screen.getByText("Open Source")).toBeInTheDocument();
    expect(screen.getByText("Activity")).toBeInTheDocument();
  });
});
