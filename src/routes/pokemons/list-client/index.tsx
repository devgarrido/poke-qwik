import {
  component$,
  useOnDocument,
  useTask$,
  $,
  useContext,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonListContext } from "~/context";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";

export default component$(() => {
  const pokemonState = useContext(PokemonListContext);

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 30, 30);

    // el valor de currentPage se mantiene en el contexto, al salir de la página y volver a ella el valor de currentPage es el mismo de cuando se estuvo antes pero aun así se lanzará una petición. Para evitarlo basta con agregar la comprobación que corte la ejecución sí esos pokemons ya están en el estado, en mi caso yo usé Object,values y some dentro de un if con el respectivo return para que finalice la ejecución y no haga la petición.

    if (
      Object.values(pokemons).some((pokemon) =>
        pokemonState.pokemons.some((p) => p.id === pokemon.id)
      )
    )
      return;
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;
  });

  // listen for scrolling events
  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      // console.log({ maxScroll, currentScroll });
      if (currentScroll + 200 > maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: {pokemonState.currentPage} </span>
        <span>
          Is navigate <span></span>
        </span>
      </div>
      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary"
        >
          Siguientes
        </button>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-6 space-x-4">
        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={id} class="">
            <PokemonImage id={id} />
            <span class="capitalize text-center">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List cliente",
  meta: [
    {
      name: "description",
      content: "List client qwik",
    },
  ],
};
