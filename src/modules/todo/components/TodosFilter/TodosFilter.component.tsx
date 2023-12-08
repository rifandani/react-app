import { limits } from "@todo/constants/todos.constant";
import useTodosFilter from "./useTodosFilter.hook";

export default function TodosFilter() {
  const { t, selectedOption, handleChangeLimit } = useTodosFilter();

  return (
    <form
      aria-label="form-filter"
      className="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2"
    >
      <label htmlFor="limit" className="label">
        <span className="label-text">{t("limit")}</span>
      </label>

      <select
        aria-label="combobox-filter"
        className="select select-bordered select-primary"
        name="limit"
        id="limit"
        value={selectedOption}
        onChange={handleChangeLimit}
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
