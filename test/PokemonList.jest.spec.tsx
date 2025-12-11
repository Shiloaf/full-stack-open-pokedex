import React from "react";
import { screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import PokemonList from "../src/PokemonList";
import { renderWithRouter } from "./App.jest.spec";
import { pokemonList } from "./testData";
import "@testing-library/jest-dom";

describe("<PokemonList />", () => {
  it("fetches pokemon list", async () => {
    fetchMock.mockResponse(JSON.stringify(pokemonList));

    renderWithRouter(<PokemonList pokemonList={pokemonList} />, {
      path: "/",
      route: "*",
    });

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeVisible();
      expect(screen.getByText("eevee")).toBeVisible();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
