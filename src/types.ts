export interface PokemonCreature {
  name: string;
  url: string;
  id: number;
}

export interface PokemonData {
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  name: string;
}
