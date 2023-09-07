import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';

export default function useNotFoundPageVM() {
  const userStore = useUserStore();
  const [t] = useI18n();

  return { userStore, t };
}
