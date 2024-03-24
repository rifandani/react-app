import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { Button } from '#shared/components/ui/button';
import { Checkbox } from '#shared/components/ui/checkbox';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { TodoSchema } from '#todo/apis/todo.api';
import { useTodoDelete } from '#todo/hooks/use-todo-delete.hook';
import { useTodoUpdate } from '#todo/hooks/use-todo-update.hook';
import { Icon } from '@iconify/react';
import { GridListItem, Link } from 'react-aria-components';
import { useHref } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

interface Props {
  todo: TodoSchema;
}

export function TodosListItem({ todo }: Props) {
  const [t] = useI18n();
  const { user } = useUserStore();
  const updateTodoMutation = useTodoUpdate();
  const deleteTodoMutation = useTodoDelete();
  const href = useHref(todo.id.toString(), { relative: 'path' });

  return (
    <GridListItem
      className="mb-2 flex items-center justify-between duration-300 ease-in-out animate-in slide-in-from-left-5"
      textValue={todo.todo}
    >
      <Checkbox
        slot="selection"
        id={`todo-${todo.id}-checkbox`}
        name={`todo-${todo.id}-checkbox`}
        isSelected={todo.completed}
        onChange={() => {
          updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
        }}
      />

      <Link
        href={href}
        className={twJoin(
          'ml-5 w-full text-left text-lg hover:font-bold',
          todo.completed && 'line-through',
        )}
      >
        {todo.todo}
      </Link>

      {user?.id === todo.userId && (
        <Button
          type="submit"
          size="sm"
          variant="destructive"
          className="gap-x-2"
          onPress={() => {
            deleteTodoMutation.mutate(todo.id);
          }}
        >
          <Icon icon="lucide:trash-2" />
          <span>{t('remove')}</span>
        </Button>
      )}
    </GridListItem>
  );
}
