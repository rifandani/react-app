import { TodoSchema } from '@todo/api/todo.schema';
import { Link } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import useTodosItem from './useTodosItem.hook';

// #region INTERFACES
interface Props {
  todo: TodoSchema;
}
// #endregion

export default function TodosItem({ todo }: Props) {
  const { t, user, handleUpdateTodo, onSubmit } = useTodosItem();

  return (
    <form
      aria-label="form-todo"
      data-testid={`form-${todo.id}`}
      className="mb-2 flex items-center justify-between duration-300 ease-in-out animate-in slide-in-from-left-5"
      onSubmit={onSubmit(todo)}
    >
      <input
        data-testid="input-todoId"
        type="hidden"
        name="todoId"
        id="todoId"
        value={todo.id}
      />

      <input
        aria-label="checkbox-todo"
        className="checkbox-primary checkbox"
        type="checkbox"
        id={`todo-${todo.id}`}
        name={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => {
          handleUpdateTodo(todo);
        }}
      />

      <Link
        aria-label="todo"
        className={twJoin(
          'ml-5 w-full text-left text-lg hover:font-bold',
          todo.completed && 'line-through',
        )}
        to={todo.id.toString()}
      >
        {todo.todo}
      </Link>

      {todo.userId === user?.id && (
        <button
          aria-label="button-submit"
          className="btn btn-primary btn-sm normal-case"
          type="submit"
        >
          {t('remove', { icon: '💥' })}
        </button>
      )}
    </form>
  );
}
