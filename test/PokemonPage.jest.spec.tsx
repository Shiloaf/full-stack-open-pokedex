import React from "react";
import { screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import PokemonPage from "../src/PokemonPage";
import { eeveePage } from "./testData";
import { renderWithRouter } from "./App.jest.spec";
import "@testing-library/jest-dom";

const previous = {
  url: "https://pokeapi.co/api/v2/pokemon/132/",
  name: "ditto",
  id: 132,
};

const next = {
  url: "https://pokeapi.co/api/v2/pokemon/134/",
  name: "vaporeon",
  id: 134,
};

describe("<PokemonPage />", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render abilities", async () => {
    fetchMock.mockResponse(JSON.stringify(eeveePage));

    renderWithRouter(<PokemonPage previous={null} next={null} />, {
      path: "/pokemon/eevee",
      route: "/pokemon/:name",
    });

    await waitFor(() => {
      expect(screen.getByText("adaptability")).toBeVisible();
      expect(screen.getByText("anticipation")).toBeVisible();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should render stats", async () => {
    fetchMock.mockResponse(JSON.stringify(eeveePage));

    renderWithRouter(<PokemonPage previous={null} next={null} />, {
      path: "/pokemon/eevee",
      route: "/pokemon/:name",
    });

    await waitFor(() => {
      expect(screen.getByTestId("stats")).toHaveTextContent("hp55attack55");
    });
  });

  it("should render previous and next urls if they exist", async () => {
    fetchMock.mockResponse(JSON.stringify(eeveePage));

    renderWithRouter(<PokemonPage previous={previous} next={next} />, {
      path: "/pokemon/eevee",
      route: "/pokemon/:name",
    });

    await waitFor(() => {
      expect(screen.getByText("Previous")).toHaveAttribute(
        "href",
        "/pokemon/ditto"
      );
      expect(screen.getByText("Next")).toHaveAttribute(
        "href",
        "/pokemon/vaporeon"
      );
    });
  });

  it("should not render previous and next urls if none exist", async () => {
    fetchMock.mockResponse(JSON.stringify(eeveePage));

    renderWithRouter(<PokemonPage previous={null} next={null} />, {
      path: "/pokemon/eevee",
      route: "/pokemon/:name",
    });

    await waitFor(() => {
      expect(screen.queryByText("Previous")).toBeNull();
      expect(screen.queryByText("Next")).toBeNull();
    });
  });
});
