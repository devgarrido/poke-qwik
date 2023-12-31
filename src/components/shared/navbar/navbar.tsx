import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { QwikLogo } from "../../icons/qwik";

import styles from "./navbar.module.css";

const Navbar = component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li class="space-x-4">
            <Link href="/login" title="login">
              Login
            </Link>
            <Link href="/dashboard" title="dashboard">
              Dashboard
            </Link>
            <Link href="/counter" title="counter">
              Counter
            </Link>
            <Link href="/pokemons/list-ssr" title="list ssr">
              List - SSR
            </Link>
            <Link href="/pokemons/list-client" title="list client">
              List - CLIENT
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
});

export default Navbar;
