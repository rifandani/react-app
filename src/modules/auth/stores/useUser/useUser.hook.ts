import { loginApiResponseSchema } from '@auth/api/auth.schema';
import { z } from 'zod';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type State = z.infer<typeof userStoreSchema>;

const uniqueName = 'app-user' as const;
const userStoreSchema = z.object({
  user: loginApiResponseSchema.nullable(),
  setUser: z.function().args(loginApiResponseSchema).returns(z.void()),
  clearUser: z.function().args(z.void()).returns(z.void()),
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
export const useUserStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (newUser) => {
          set({ user: newUser });
        },
        clearUser: () => {
          set({ user: null });
        },
      }),
      {
        name: uniqueName, // name of the item in the storage (must be unique)
        version: 0, // a migration will be triggered if the version in the storage mismatches this one
        storage: createJSONStorage(() => localStorage), // by default, 'localStorage' is used
      },
    ),
  ),
);
