import { useSignal, $, useComputed$ } from "@builder.io/qwik";

export const useCounter = (initialValue: number = 0) => {
  const counter = useSignal(initialValue);

  const decrement = $(() => counter.value--);
  const increment = $(() => counter.value++);
  return {
    counter: useComputed$(() => counter.value), // signal read only conversion to computed.
    decrement,
    increment,
  };
};
