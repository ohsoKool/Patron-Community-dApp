import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  walletAddress: String | null;
};

type Actions = {
  setWalletAddress: (address: String) => void;
  reset: () => void;
};

const initialState: State = {
  walletAddress: null,
};

type walletSliceType = State & Actions;

const walletSlice: StateCreator<walletSliceType, [], [], walletSliceType> = (
  set
) => ({
  ...initialState,
  setWalletAddress: (address) => {
    set((state) => ({
      ...state,
      walletAddress: address,
    }));
  },
  reset: () => {
    set(initialState);
  },
});

const useWalletStore = create(
  devtools(
    persist(walletSlice, {
      name: "user",
    })
  )
);

export default useWalletStore;
