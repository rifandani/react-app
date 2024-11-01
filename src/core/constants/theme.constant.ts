export type Theme = 'auto' | 'light' | 'dark' | 'cupcake';

export const themes: Theme[] = ['auto', 'light', 'dark', 'cupcake'];

// object version of `themes`
export const modes = themes.reduce(
  (acc, item) => {
    acc[item] = item;
    return acc;
  },
  {} as Record<Theme, Theme>,
);
