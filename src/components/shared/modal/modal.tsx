import {
  type PropFunction,
  Slot,
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import ModalStyles from "./modal.css?inline";

interface ModalProps {
  showModal: boolean;
  persistent?: boolean | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  closeFn: PropFunction<() => void>; // Interesante. Ver bien la documentación.
}
export const Modal = component$(
  ({ showModal, persistent = false, size = "md", closeFn }: ModalProps) => {
    useStylesScoped$(ModalStyles);

    return (
      <div
        id="modal-content"
        onClick$={closeFn}
        class={showModal ? "modal-background" : "hidden"}
      >
        <div
          class={["modal-content", `modal-${size}`]}
          onClick$={(e) => {
            if (!persistent) e.stopPropagation();
          }}
        >
          <div class="mt-3 text-center">
            <h3 class="modal-title">
              <Slot name="title" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="modal-content-text">
                <Slot name="content" />
              </div>
            </div>

            {/* Botton */}
            <div class="items-center px-4 py-3">
              <button id="ok-btn" class="modal-button" onClick$={closeFn}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
