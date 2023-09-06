import { authPath } from '@auth/routes/auth.route';
import { useUserStore } from '@auth/stores/useUser/useUser.hook';
import { modes } from '@shared/constants/theme.constant';
import { useColorMode } from '@shared/hooks/useColorMode/useColorMode.hook';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { useNavigate } from 'react-router-dom';

export default function useNavbarMenu() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const { user, clearUser } = useUserStore();
  const [, setTheme] = useColorMode({
    modes,
    attribute: 'data-theme',
  });

  // #region HANDLERS
  const handleClickLogout = () => {
    clearUser(); // clear user store
    navigate(authPath.login); // back to login page
  };
  // #endregion

  return { t, user, setTheme, handleClickLogout };
}
