import React from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import PokemonAbility from "./PokemonAbility";
import ErrorMessage from "./ErrorMessage";
import { PokemonCreature } from "./types";
import { useGetPokemonByNameQuery } from "./store/apiSlice";

const formatName = (nameWithDash: string) => nameWithDash.replace("-", " ");

const PokemonPage = ({
  previous,
  next,
}: {
  previous: PokemonCreature | null;
  next: PokemonCreature | null;
}) => {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonByNameQuery(name!);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!pokemon) {
    return <ErrorMessage error={{ message: "Pokemon name not recognized" }} />;
  }

  const type = pokemon.types.find((type) => type.slot === 1)?.type;
  if (!type) {
    return <ErrorMessage error={{ message: "Pokemon type not recognized" }} />;
  }
  const stats = pokemon.stats
    .map((stat) => ({
      name: formatName(stat.stat.name),
      value: stat.base_stat,
    }))
    .reverse();
  const normalAbility = pokemon.abilities.find((ability) => !ability.is_hidden);
  const hiddenAbility = pokemon.abilities.find(
    (ability) => ability.is_hidden === true
  );

  console.log("hiddenAbility=", hiddenAbility);
  return (
    <>
      <div className="links">
        {previous && <Link to={`/pokemon/${previous.name}`}>Previous</Link>}
        <Link to="/">Home</Link>
        {next && <Link to={`/pokemon/${next.name}`}>Next</Link>}
      </div>
      <div className={`pokemon-page pokemon-type-${type.name}`}>
        <div
          className="pokemon-image"
          style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
        />
        <div className="pokemon-info">
          <div className="pokemon-name">{pokemon.name}</div>
          <div className="pokemon-stats" data-testid="stats">
            <table>
              <tbody>
                {stats.map(({ name, value }) => (
                  <tr key={name}>
                    <td className="pokemon-stats-name">{name}</td>
                    <td className="pokemon-stats-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pokemon-abilities">
            {normalAbility && (
              <PokemonAbility
                abilityName={formatName(normalAbility.ability.name)}
              />
            )}
            {hiddenAbility && (
              <PokemonAbility
                abilityName={formatName(hiddenAbility.ability.name)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
