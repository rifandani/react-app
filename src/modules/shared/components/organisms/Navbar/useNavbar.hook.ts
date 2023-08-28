import useCheckAuth from '@auth/hooks/useCheckAuth/useCheckAuth.hook';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';

export default function useNavbar() {
  useCheckAuth();
  const [t] = useI18n();

  return { t };
}
