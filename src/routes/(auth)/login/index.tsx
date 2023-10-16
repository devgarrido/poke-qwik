import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

import styles from "./login.css?inline";

export const useLogin = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;
    // conditionally return error
    if (email === "correo@email.com" && password === "123456") {
      // set cookie
      cookie.set("jwt", "1234567890", { secure: true, path: "/" });
      // redirect to home
      redirect(302, "/");
      return {
        success: true,
        jwtToken: "1234567890",
      };
    }
    return {
      success: false,
    };
  },
  zod$({
    email: z.string().email("Formato de correo invalido."),
    password: z.string().min(6, "Minimo de 6 caracteres").max(20),
  })
);

export default component$(() => {
  useStylesScoped$(styles);
  const action = useLogin();
  return (
    <Form class="login-form mt-5" action={action}>
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>
      <p>
        {action.value?.success && (
          <>
            <span class="text-green-500">Login success</span>
            <code>Authenticate with token: {action.value.jwtToken}</code>
          </>
        )}
      </p>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});
