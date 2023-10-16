import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonGameContext } from "~/context";

export const usepokemonRoute = routeLoader$<number>((event) => {
  const { params, redirect } = event;
  //console.log(event);
  const id = Number(params.id);
  if (isNaN(id)) throw redirect(301, "/");
  if (id <= 0) throw redirect(301, "/");
  if (id > 1400) throw redirect(301, "/");
  return id;
});

export default component$(() => {
  const pokemonId = usepokemonRoute();
  const pokemonGame = useContext(PokemonGameContext);

  // const loc = useLocation();
  // console.log(loc);

  return (
    <div>
      <span class="text-5xl">Pokemon: {pokemonId.value}</span>
      <PokemonImage
        id={pokemonId.value}
        isVisible={pokemonGame.isPokemonVisible}
        backImage={pokemonGame.showBackImage}
      />
    </div>
  );
});
