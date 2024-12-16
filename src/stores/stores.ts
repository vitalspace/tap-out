import { writable } from "svelte/store";
import { allGames } from "./Games";

export const user = writable("Vital");
export const attempts = writable(0);
export const currentObject = writable(null);
export const Games = writable(allGames);
export const currentGame = writable(null);
export const currentGameIndex = writable(0);
export const restart = writable(false);
export const showWin = writable(false);
export const showLose = writable(false);
export const showLevel = writable(true);
export const showSettings = writable(false);
export const audioStatus = writable(true);

const createLocalStore = (key: string, initialValue: any) => {
  // Verificar si estamos en el navegador
  const browser = typeof window !== "undefined";

  // Obtener el valor almacenado solo si estamos en el navegador
  const storeValue = browser ? localStorage.getItem(key) : null;

  const store = writable(storeValue ? JSON.parse(storeValue) : initialValue);

  // Suscribirse a los cambios solo si estamos en el navegador
  if (browser) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return {
    ...store,
    reset: () => {
      store.set(initialValue);
    },
    clear: () => {
      if (browser) {
        localStorage.removeItem(key);
      }
      store.set(initialValue);
    },
  };
};

export const userGlobalScore = createLocalStore("score", 0);
