import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { useTodos } from '@todo/hooks/useTodos/useTodos.hook';
import { useLoaderData } from 'react-router-dom';

export default function useTodosList() {
  const initialData = useLoaderData() as TodoListApiResponseSchema;
  const [t] = useI18n();
  const todosQuery = useTodos({ initialData });

  return { t, todosQuery };
}
