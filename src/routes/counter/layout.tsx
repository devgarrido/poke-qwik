import { component$, Slot } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();
  return (
    <div class="flex flex-col justify-center items-center mt-10">
      <Slot />
      <div>
        <button onClick$={() => nav("/")} class="btn btn-primary mt-10">
          Home
        </button>
      </div>
    </div>
  );
});
