import { loginRoute } from '@auth/routes/auth.route';
import { useUserStore } from '@auth/stores/useUser/useUser.hook';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { useNavigate } from 'react-router-dom';

export default function useNavbarMenu() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const { user, clearUser } = useUserStore();
  // const [, setTheme] = createColorMode({
  //   modes,
  //   attribute: 'data-theme',
  // });

  // #region HANDLERS
  const handleClickLogout = () => {
    clearUser(); // clear user store
    navigate(loginRoute.path); // back to login page
  };
  // #endregion

  return { t, user, handleClickLogout };
}
