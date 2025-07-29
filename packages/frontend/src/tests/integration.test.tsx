import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharactersPage } from "@/pages/CharactersPage";
import api from "@/services/api";

// Mock the API to use the real backend
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

// Mock the API service to point to the backend
vi.mock("@/services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Frontend Integration Tests", () => {
  beforeAll(async () => {
    // Mock successful API response
    const mockApi = api as any;
    mockApi.get.mockResolvedValue({
      data: {
        info: {
          count: 826,
          pages: 42,
          next: "https://rickandmortyapi.com/api/character?page=2",
          prev: null,
        },
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            isFavorite: false,
          },
          {
            id: 2,
            name: "Morty Smith",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            isFavorite: true,
          },
        ],
      },
    });
  });

  afterAll(async () => {
    vi.clearAllMocks();
  });

  it("should fetch characters from the backend API", async () => {
    render(
      <TestWrapper>
        <CharactersPage />
      </TestWrapper>
    );

    // Wait for the loading state to disappear
    await waitFor(
      () => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Check if characters are displayed
    await waitFor(() => {
      expect(screen.getByText("Rick & Morty Characters")).toBeInTheDocument();
    });

    // Check if the table headers are present
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Species")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Favorite")).toBeInTheDocument();

    // Check if character data is displayed
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("should handle API errors gracefully", async () => {
    // Create a new query client for this test
    const errorQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Mock the API to return an error for this test
    const mockApi = api as any;
    mockApi.get.mockRejectedValueOnce(new Error("API Error"));

    render(
      <QueryClientProvider client={errorQueryClient}>
        <BrowserRouter>
          <CharactersPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error loading characters")).toBeInTheDocument();
    });

    // Restore the successful mock for other tests
    mockApi.get.mockResolvedValue({
      data: {
        info: { count: 826, pages: 42, next: null, prev: null },
        results: [],
      },
    });
  });

  it("should display pagination controls", async () => {
    render(
      <TestWrapper>
        <CharactersPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });

    // Check pagination info
    expect(screen.getByText("Page 1 of 42")).toBeInTheDocument();
  });
});
