import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonData, type PokeApiResponse } from "../types";

type PageParams = {
  offset: number;
  limit: number;
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/pokemon/" }),
  endpoints: (builder) => ({
    getPokemons: builder.infiniteQuery<PokeApiResponse, void, PageParams>({
      query: ({ pageParam: { offset, limit } }: { pageParam: PageParams }) => {
        return `?offset=${offset}&limit=${limit}`;
      },
      infiniteQueryOptions: {
        maxPages: 1,
        initialPageParam: {
          offset: 0,
          limit: 50,
        },
        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPagesParam
        ) => {
          if (lastPage.next) {
            return {
              offset: lastPageParam.offset + lastPageParam.limit,
              limit: lastPageParam.limit,
            };
          }
          return null;
        },
        getPreviousPageParam: (
          firstPage,
          allPages,
          firstPageParam,
          allPagesParam
        ) => {
          if (firstPage.previous) {
            return {
              offset: firstPageParam.offset - firstPageParam.limit,
              limit: firstPageParam.limit,
            };
          }
          return null;
        },
      },
      transformResponse: (response: PokeApiResponse) => {
        response.results = response.results.map(({ name, url }) => ({
          name,
          url,
          id: Number.parseInt(url.split("/")[6], 10),
        }));
        return response;
      },
    }),
    getPokemonByName: builder.query<PokemonData, string>({
      query: (name) => name,
    }),
  }),
});

export const { useGetPokemonsInfiniteQuery, useGetPokemonByNameQuery } =
  apiSlice;

export default apiSlice;
