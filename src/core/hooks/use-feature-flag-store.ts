import { getSchemaDefaults } from '#/core/utils/helper.util';
import { z } from 'zod';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const defaultValue = import.meta.env.VITE_MODE === 'development';
const featureFlagStoreName = 'react-app-feature-flag' as const;
const featureFlagStoreStateSchema = z.object({
  auth: z.object({
    condition: z.object({
      service_checking: z.boolean().default(defaultValue),
    }),
    endpoint: z.object({
      list_user_access: z.boolean().default(defaultValue),
    }),
    route: z.object({
      '/user-access/role': z.boolean().default(defaultValue),
    }),
    ui: z.object({
      logout_button: z.boolean().default(defaultValue),
    }),
  }),
});

export type FeatureFlagStoreStateSchema = z.infer<
  typeof featureFlagStoreStateSchema
>;
export type FeatureFlagStoreActionSchema = {
  reset: () => void;
};
export type FeatureFlagStoreSchema = z.infer<
  typeof featureFlagStoreStateSchema
> &
  FeatureFlagStoreActionSchema;

export const featureFlagStoreInitialState = getSchemaDefaults<
  typeof featureFlagStoreStateSchema
>(featureFlagStoreStateSchema);

/**
 * Persisted react-app-feature-flag store.
 *
 * @example
 *
 * ```tsx
 * const reset = useFeatureFlagStore(state => state.reset)
 * ```
 */
export const useFeatureFlagStore = create<FeatureFlagStoreSchema>()(
  devtools(
    persist(
      (set) => ({
        ...featureFlagStoreInitialState,

        reset: () => {
          set(featureFlagStoreInitialState);
        },
      }),
      {
        name: featureFlagStoreName, // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // by default, 'localStorage' is used
        version: 0, // a migration will be triggered if the version in the storage mismatches this one
        // migrate: (persistedState, version) => {
        //   if (version === 0) {
        //     // if the stored value is in version 0, we rename the field to the new name
        //     persistedState.newField = persistedState.oldField;
        //     delete persistedState.oldField;
        //   }

        //   return persistedState;
        // },
      },
    ),
  ),
);
