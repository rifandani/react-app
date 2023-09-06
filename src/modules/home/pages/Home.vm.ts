import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { useNavigate } from 'react-router-dom';

export default function useHomePageVM() {
  const [t] = useI18n();
  const navigate = useNavigate();

  return { t, navigate };
}
