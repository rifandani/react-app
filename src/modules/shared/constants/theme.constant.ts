import { Theme } from '@shared/types/theme.type';

export const themes: Theme[] = [
  'auto',
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

// object version of `themes`
export const modes = themes.reduce(
  (acc, item) => {
    acc[item] = item;
    return acc;
  },
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  {} as Record<Theme, Theme>,
);
