import { onSnapshot } from "mobx-state-tree";

type Model = {
  is: <T>(snapshot: T) => boolean;
};

export function applySnapshot<A extends string, B extends Model, C>(
  snapshotName: A,
  model: B,
  initialState: C
): C {
  // apply snapshot if it is exist and correspond to tree model
  const snapshot = JSON.parse(localStorage.getItem(snapshotName) || "false");
  return snapshot && model.is(snapshot) ? snapshot : initialState;
}

export function saveSnapshot<T extends string, K>(name: T, store: K): void {
  onSnapshot(store, (snapshot) => {
    localStorage.setItem(name, JSON.stringify(snapshot));
  });
}
