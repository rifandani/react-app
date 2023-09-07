import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { TodoSchema } from '@todo/api/todo.schema';
import { useTodoDelete } from '@todo/hooks/useTodoDelete/useTodoDelete.hook';
import { useTodoUpdate } from '@todo/hooks/useTodoUpdate/useTodoUpdate.hook';
import { FormEvent } from 'react';

export default function useTodosItem() {
  const [t] = useI18n();
  const { user } = useUserStore();
  const updateTodoMutation = useTodoUpdate();
  const deleteTodoMutation = useTodoDelete();

  // #region HANDLERS
  const handleUpdateTodo = (todo: TodoSchema) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };
  const onSubmit = (todo: TodoSchema) => (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // only allow for the correct auth user
    if (todo.userId === user?.id) deleteTodoMutation.mutate(todo.id);
  };
  // #endregion

  return { t, user, handleUpdateTodo, onSubmit };
}
