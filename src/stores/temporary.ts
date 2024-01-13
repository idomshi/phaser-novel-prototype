import { action, atom } from "nanostores";

export const $message = atom("");

export interface Character {
  name: string;
  face: string;
}

export const $chars = atom<Character[]>([]);

export const setMessage = action($message, "setMessage", (store, str) => {
  store.set(str);
});

export const setChar = action(
  $chars,
  "setChar",
  (store, name: string, face: string) => {
    const oldVal = store.value ?? [];
    const idx = oldVal.findIndex((value) => value.name === name);
    let newVal;
    if (idx < 0) {
      newVal = [...oldVal, { name, face }];
    } else {
      oldVal.splice(idx, 1, { name, face });
      newVal = oldVal;
    }
    store.set(newVal);
  },
);

export const removeChar = action(
  $chars,
  "removeChar",
  (store, name: string) => {
    const chars = store.value ?? [];
    const idx = chars.findIndex((value) => value.name === name);
    chars.splice(idx, 1);
    store.set([...chars]);
  },
);
