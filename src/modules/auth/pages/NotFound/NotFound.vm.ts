import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { modes } from '@shared/constants/theme.constant';
import { useColorMode } from '@shared/hooks/useColorMode/useColorMode.hook';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';

export default function useNotFoundPageVM() {
  const userStore = useUserStore();
  const [t] = useI18n();
  useColorMode({
    modes,
    attribute: 'data-theme',
  });

  return { userStore, t };
}
