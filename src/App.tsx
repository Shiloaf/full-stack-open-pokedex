import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { useApi } from "./useApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import PokemonPage from "./PokemonPage";
import PokemonList from "./PokemonList";
import { PokemonCreature } from "./types";

const mapResults = ({
  results,
}: {
  results: { url: string; name: string }[];
}) =>
  results.map(({ url, name }) => ({
    url,
    name,
    id: Number.parseInt(url.split("/")[6], 10),
  }));

const App = () => {
  const match = useMatch("/pokemon/:name");
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useApi<PokemonCreature[]>(
    "https://pokeapi.co/api/v2/pokemon/?limit=50",
    mapResults
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  let next: PokemonCreature | null = null;
  let previous: PokemonCreature | null = null;

  if (!pokemonList) {
    return <ErrorMessage error="Pokemon list not working" />;
  }

  if (match?.params) {
    const pokemonId = pokemonList.find(
      ({ name }) => name === match.params.name
    )?.id;
    if (!pokemonId) {
      return <ErrorMessage error="Pokemon name not recognized" />;
    }
    previous = pokemonList.find(({ id }) => id === pokemonId - 1) || null;
    next = pokemonList.find(({ id }) => id === pokemonId + 1) || null;
  }

  return (
    <Routes>
      <Route path="/" element={<PokemonList pokemonList={pokemonList} />} />
      <Route
        path="/pokemon/:name"
        element={<PokemonPage previous={previous} next={next} />}
      />
    </Routes>
  );
};

export default App;
