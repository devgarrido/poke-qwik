import {
  component$,
  useComputed$,
  useSignal,
  $,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  useLocation,
  Link,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { Modal } from "~/components/shared";
import { getChatGptResponse } from "~/helpers/get-chat-gpt-response";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || "0");
    if (offset < 0 || isNaN(offset)) throw redirect(301, pathname);
    return await getSmallPokemons(offset);
  }
);

export default component$(() => {
  const pokemonList = usePokemonList();
  const loc = useLocation();
  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: "",
    name: "",
  });

  const chatGPTPokemon = useSignal("");

  // Modals functions
  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });
  const closeModal = $(() => {
    modalVisible.value = false;
  });

  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);
    chatGPTPokemon.value = "";
    if (modalPokemon.name.length > 0) {
      getChatGptResponse(modalPokemon.name).then(
        (resp) => (chatGPTPokemon.value = resp)
      );
    }
  });

  // Current offset
  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(loc.url.search).get("offset");
    return Number(offsetString) || 0;
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current offset: {currentOffset}</span>
        <span>
          Is navigate <span>{loc.isNavigating ? "Nav true" : "Nav false"}</span>
        </span>
      </div>
      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary"
        >
          Siguientes
        </Link>
      </div>
      <div class="grid grid-cols-6 mt-5 gap-4 space-x-4">
        {pokemonList.value.map(({ name, id }) => (
          <div key={id} onClick$={() => showModal(id, name)}>
            <PokemonImage id={id} />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
      <Modal
        showModal={modalVisible.value}
        persistent={false}
        closeFn={closeModal}
      >
        <div q:slot="title">{modalPokemon.name}</div>
        <div class="flex flex-col items-center justify-center" q:slot="content">
          <PokemonImage id={modalPokemon.id} />
          <span>
            {chatGPTPokemon.value === "" ? "Loading..." : chatGPTPokemon.value}
          </span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
  meta: [
    {
      name: "description",
      content: "List SSR in Qwik",
    },
  ],
};
