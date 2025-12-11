export const eeveePage = {
  id: 133,
  abilities: [
    {
      ability: {
        name: "anticipation",
        url: "https://pokeapi.co/api/v2/ability/107/",
      },
      is_hidden: true,
      slot: 3,
    },
    {
      ability: {
        name: "adaptability",
        url: "https://pokeapi.co/api/v2/ability/91/",
      },
      is_hidden: false,
      slot: 2,
    },
  ],
  name: "eevee",
  stats: [
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "normal",
        url: "https://pokeapi.co/api/v2/type/1/",
      },
    },
  ],
  sprites: { front_default: "URL" },
};

export const pokemonList = [
  {
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    name: "bulbasaur",
    id: 1,
  },
  {
    url: "https://pokeapi.co/api/v2/pokemon/133/",
    name: "eevee",
    id: 133,
  },
];
