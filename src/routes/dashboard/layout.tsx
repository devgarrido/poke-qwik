import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Navbar from "~/components/shared/navbar/navbar";

export const useAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwt = cookie.get("jwt");
  if (!jwt) {
    redirect(302, "/login");
  }
});

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
