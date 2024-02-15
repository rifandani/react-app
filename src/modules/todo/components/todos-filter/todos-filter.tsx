import { useSearchParams } from 'react-router-dom';
import { useI18n } from '#shared/hooks/use-i18n.hook';
import { defaultLimit, limits } from '#todo/constants/todos.constant';

export function TodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useI18n();

  const params = Object.fromEntries(searchParams);
  const selectedOption = params?.limit ?? defaultLimit;

  return (
    <form
      aria-label="form-filter"
      className="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2"
    >
      <label htmlFor="limit" className="label">
        <span className="label-text">{t('limit')}</span>
      </label>

      <select
        aria-label="combobox-filter"
        className="select select-bordered select-primary"
        name="limit"
        id="limit"
        value={selectedOption}
        onChange={(evt) => {
          // set to url params
          searchParams.set('limit', evt.currentTarget.value);
          setSearchParams(searchParams);
        }}
      >
        {limits.map((limit) => (
          <option
            key={limit}
            data-testid={`option-limit-${limit}`}
            value={limit}
          >
            {limit}
          </option>
        ))}
      </select>
    </form>
  );
}
