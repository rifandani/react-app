import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { defaultLimit } from '@todo/constants/todos.constant';
import { ChangeEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useTodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useI18n();

  const params = Object.fromEntries(searchParams);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const selectedOption = params?.limit ?? defaultLimit;

  // #region HANDLERS
  const handleChangeLimit: ChangeEventHandler<HTMLSelectElement> = ({
    currentTarget,
  }) => {
    // set to url params
    searchParams.set('limit', currentTarget.value);
    setSearchParams(searchParams);
  };
  // #endregion

  return { t, selectedOption, handleChangeLimit };
}
