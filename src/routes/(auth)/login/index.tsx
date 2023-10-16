import {
  component$,
  useStore,
  useStylesScoped$,
  $,
  useComputed$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({
    email: "",
    password: "",
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    return formState.email.includes("@") ? "" : "not-valid";
  });

  const passwordError = useComputed$(() => {
    return formState.password.length >= 6 ? "" : "not-valid";
  });

  const isFormValid = useComputed$(() => {
    if (
      emailError.value === "not-valid" ||
      passwordError.value === "not-valid"
    ) {
      return false;
    }
    return true;
  });

  const onSubmit = $(() => {
    formState.formPosted = true;
    const { email, password } = formState;
    console.log({ isFormValid: isFormValid.value });
    console.log({ email, password });
  });

  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          class={formState.formPosted ? emailError.value : ""}
          onInput$={(e) =>
            (formState.email = (e.target as HTMLInputElement).value)
          }
          value={formState.email}
          name="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          class={formState.formPosted ? passwordError.value : ""}
          onInput$={(e) =>
            (formState.password = (e.target as HTMLInputElement).value)
          }
          value={formState.password}
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button disabled={!isFormValid.value} type="submit">
          Ingresar
        </button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
