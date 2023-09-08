import useI18n from '@shared/hooks/useI18n/useI18n.hook';

export default function useLoginPageVM() {
  const [t] = useI18n();

  return { t };
}
