import { $, component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate();

  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible,
  } = usePokemonGame();

  const gotoPokemon = $(async (id: number) => {
    await nav(`/pokemon/${id}`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl">{pokemonId}</span>
      <div
        class="border hover:cursor-pointer focus:cursor-wait"
        onClick$={() => gotoPokemon(pokemonId.value)}
      >
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">
          Anterior
        </button>

        <button onClick$={nextPokemon} class="btn btn-primary mr-2">
          Siguiente
        </button>

        <button onClick$={toggleFromBack} class="btn btn-primary mr-2">
          Voltear
        </button>

        <button onClick$={toggleVisible} class="btn btn-primary mr-2">
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicación en qwik",
    },
  ],
};
