import { authLoginResponseSchema } from '#/auth/apis/auth.api';
import { isFunction } from '@rifandani/nxact-yutiriti';
import React from 'react';
import { z } from 'zod';
import { create, createStore, useStore } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export type UserStoreState = z.infer<typeof userStoreStateSchema>;
export type UserStore = z.infer<typeof userStoreSchema>;
export type UserStoreLocalStorage = z.infer<typeof userStoreLocalStorageSchema>;

export const userStoreName = 'app-user' as const;
const userStoreStateSchema = z.object({
  user: authLoginResponseSchema.nullable(),
});
const userStoreActionSchema = z.object({
  setUser: z.function().args(authLoginResponseSchema).returns(z.void()),
  clearUser: z.function().args(z.void()).returns(z.void()),
});
export const userStoreSchema = userStoreStateSchema.merge(
  userStoreActionSchema,
);
export const userStoreLocalStorageSchema = z.object({
  state: userStoreStateSchema,
  version: z.number(),
});

/**
 * Hooks to manipulate user store
 *
 * @example
 *
 * ```tsx
 * const { user, setUser, clearUser } = useUserStore()
 * ```
 */
export const useAuthUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,

        setUser: (user) => {
          set({ user });
        },
        clearUser: () => {
          set({ user: null });
        },
      }),
      {
        name: userStoreName, // name of the item in the storage (must be unique)
        version: 0, // a migration will be triggered if the version in the storage mismatches this one
        storage: createJSONStorage(() => localStorage), // by default, 'localStorage' is used
      },
    ),
  ),
);

/**
 * for use with react context to initialize the store with props (default state)
 *
 * @link https://docs.pmnd.rs/zustand/guides/initialize-state-with-props
 */
const createUserStore = (initialState?: Partial<UserStoreState>) => {
  return createStore<UserStore>()(
    devtools((set) => ({
      user: null,
      ...initialState,

      setUser: (user) => {
        set({ user });
      },
      clearUser: () => {
        set({ user: null });
      },
    })),
  );
};

export const UserContext = React.createContext<ReturnType<
  typeof createUserStore
> | null>(null);

export function useUserContext<T>(selector: (_store: UserStore) => T): T {
  const store = React.useContext(UserContext);
  if (!store) throw new Error('Missing UserContext.Provider in the tree');

  return useStore(store, selector);
}

/**
 * for use with react context to initialize the store with props (default state)
 *
 * @link https://docs.pmnd.rs/zustand/guides/initialize-state-with-props
 */
export function UserProvider({
  children,
  initialState,
}: {
  children:
    | React.ReactNode
    | ((context: ReturnType<typeof createUserStore>) => JSX.Element);
  initialState?: Parameters<typeof createUserStore>[0];
}) {
  const storeRef = React.useRef<ReturnType<typeof createUserStore> | null>(
    null,
  );
  if (!storeRef.current) {
    storeRef.current = createUserStore(initialState);
  }

  return (
    <UserContext.Provider value={storeRef.current}>
      {isFunction(children) ? children(storeRef.current) : children}
    </UserContext.Provider>
  );
}
