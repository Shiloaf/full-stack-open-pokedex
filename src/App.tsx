import React from "react";
import { Routes, Route, useMatch, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import PokemonPage from "./PokemonPage";
import PokemonList from "./PokemonList";
import { PokemonCreature } from "./types";
import { useGetPokemonsInfiniteQuery } from "./store/apiSlice";

const App = () => {
  const location = useLocation();
  const match = useMatch("/pokemon/:name");
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
    error,
  } = useGetPokemonsInfiniteQuery();

  console.log(location);
  const pokemonList = data?.pages.flatMap((page) => page.results) ?? [];

  if (isFetchingNextPage) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  let next: PokemonCreature | null = null;
  let previous: PokemonCreature | null = null;

  if (match?.params) {
    const pokemonId = pokemonList.find(
      ({ name }) => name === match.params.name
    )?.id;
    if (!pokemonId) {
      return <ErrorMessage error={{ message: "Pokemon not found" }} />;
    }
    previous = pokemonList.find(({ id }) => id === pokemonId - 1) || null;
    next = pokemonList.find(({ id }) => id === pokemonId + 1) || null;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<PokemonList pokemonList={pokemonList} />} />
        <Route
          path="/*"
          element={
            <ErrorMessage error={{ message: "This page does not exist" }} />
          }
        />
        <Route
          path="/pokemon/:name"
          element={<PokemonPage previous={previous} next={next} />}
        />
      </Routes>

      <button
        onClick={fetchPreviousPage}
        disabled={!hasPreviousPage || isFetchingPreviousPage}
        style={location.pathname === "/" ? {} : { display: "none" }}
      >
        Previous
      </button>
      <button
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
        style={location.pathname === "/" ? {} : { display: "none" }}
      >
        Next
      </button>
    </>
  );
};

export default App;
