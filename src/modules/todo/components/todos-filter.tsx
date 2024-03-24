import { Label } from '#shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '#shared/components/ui/select';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { defaultLimit, limits } from '#todo/constants/todos.constant';
import { useSearchParams } from 'react-router-dom';

export function TodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useI18n();

  const params = Object.fromEntries(searchParams);
  const selectedLimit = params?.limit ?? defaultLimit;
  const items = limits.map((limit) => ({ id: limit }));

  return (
    <form className="pb-3 w-full">
      <Select
        aria-label="todo list limit selection"
        selectedKey={selectedLimit}
        onSelectionChange={(selected) => {
          // set to url params
          searchParams.set('limit', selected as string);
          setSearchParams(searchParams);
        }}
      >
        <Label>{t('limit')}</Label>

        <SelectTrigger className="w-[160px]">
          <SelectValue>{({ selectedText }) => selectedText}</SelectValue>
        </SelectTrigger>

        <SelectPopover>
          <SelectContent aria-label="limits" items={items}>
            {({ id }) => <SelectItem textValue={id}>{id}</SelectItem>}
          </SelectContent>
        </SelectPopover>
      </Select>
    </form>
  );
}
