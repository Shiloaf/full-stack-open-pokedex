import React from "react";
import { Link } from "react-router-dom";
import { PokemonCreature } from "./types";

const PokemonList = ({ pokemonList }: { pokemonList: PokemonCreature[] }) => {
  return (
    <div className="list-container">
      {pokemonList.map(({ id, name }) => {
        const bgImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return (
          <Link
            key={id}
            to={`/pokemon/${name}`}
            className="list-item"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div className="list-item-name">{name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default PokemonList;
