import { Slot, component$ } from "@builder.io/qwik";
import Navbar from "~/components/shared/navbar/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col items-center justify-center">
        <span class="text-2xl">Dashboard Layout</span>
        <Slot />
      </div>
    </>
  );
});
