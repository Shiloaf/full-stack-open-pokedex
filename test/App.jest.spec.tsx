jest.mock("axios");
import React from "react";
import { render, screen } from "@testing-library/react";
import axiosMock from "axios";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../src/App";

const mockedAxios = axiosMock as jest.Mocked<typeof axiosMock>;

describe("<App />", () => {
  it("fetches data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            name: "bulbasaur",
            id: 1,
          },
        ],
      },
    });
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>
      );
    });
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/?limit=50"
    );
  });

  it("shows error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("error"));
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>
      );
    });
    expect(screen.getByTestId("error")).toBeVisible();
  });
});
