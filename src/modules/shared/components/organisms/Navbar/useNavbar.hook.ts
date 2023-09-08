import useI18n from '@shared/hooks/useI18n/useI18n.hook';

export default function useNavbar() {
  const [t] = useI18n();

  return { t };
}
