import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { TodoSchema } from '#todo/apis/todo.api';
import { useTodoDelete } from '#todo/hooks/use-todo-delete.hook';
import { useTodoUpdate } from '#todo/hooks/use-todo-update.hook';
import { Button } from 'react-aria-components';
import { Link } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import { match } from 'ts-pattern';

export function TodosItem({
  todo,
}: {
  todo: TodoSchema;
}) {
  const [t] = useI18n();
  const { user } = useUserStore();
  const updateTodoMutation = useTodoUpdate();
  const deleteTodoMutation = useTodoDelete();

  return (
    <form
      aria-label={`form todo item with id: ${todo.id}`}
      className="mb-2 flex items-center justify-between duration-300 ease-in-out animate-in slide-in-from-left-5"
      onSubmit={(evt) => {
        evt.preventDefault();

        // only allow for the correct auth user
        if (todo.userId === user?.id) deleteTodoMutation.mutate(todo.id);
      }}
    >
      <input type="hidden" name="todoId" id="todoId" value={todo.id} />

      <input
        type="checkbox"
        className="checkbox-primary checkbox"
        aria-label={`toggle completed todo item with id: ${todo.id}`}
        id={`checkbox-todo-${todo.id}`}
        name={`checkbox-todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => {
          updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
        }}
      />

      <Link
        aria-label={`link todo item with id: ${todo.id}`}
        className={twJoin(
          'ml-5 w-full text-left text-lg hover:font-bold',
          todo.completed && 'line-through',
        )}
        to={todo.id.toString()}
      >
        {todo.todo}
      </Link>

      {match(user?.id)
        .with(todo.userId, () => (
          <Button
            aria-label={`remove todo item with id: ${todo.id}`}
            className="btn btn-primary btn-sm normal-case"
            type="submit"
          >
            {t('remove')}
          </Button>
        ))
        .otherwise(() => null)}
    </form>
  );
}
