import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

import {
  PokemonGameContext,
  type PokemonGameState,
} from "./pokemon-game.context";
import {
  PokemonListContext,
  type PokemonListState,
} from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: true,
    showBackImage: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });
  useContextProvider(PokemonListContext, pokemonList);
  useContextProvider(PokemonGameContext, pokemonGame);

  useVisibleTask$(() => {
    //TODO:  read from local storage.
    if (localStorage.getItem("pokemon-game")) {
      const {
        isPokemonVisible = true,
        pokemonId = 10,
        showBackImage = false,
      } = JSON.parse(localStorage.getItem("pokemon-game")!) as PokemonGameState;

      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    //TODO: write to local storage when pokemon object changes.
    track(() => [
      pokemonGame.isPokemonVisible,
      pokemonGame.showBackImage,
      pokemonGame.pokemonId,
    ]); // track the changes of the pokemon object.
    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
