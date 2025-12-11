import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "./testStore";
import fetchMock from "jest-fetch-mock";
import { pokemonList } from "./testData";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "../src/App";
import "@testing-library/jest-dom";

export const renderWithRouter = (
  ui: React.ReactElement,
  { path = "/", route = "/" } = {},
  store = createTestStore()
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("<App />", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches pokemon list", async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        results: pokemonList,
      })
    );

    renderWithRouter(<App />, {
      path: "/",
      route: "*",
    });

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeVisible();
      expect(screen.getByText("eevee")).toBeVisible();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  it("Pokemon List shows error", async () => {
    fetchMock.mockReject(new Error("error"));

    renderWithRouter(<App />, {
      path: "/",
      route: "*",
    });

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeVisible();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
