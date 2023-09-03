import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { useTodos } from '@todo/hooks/useTodos/useTodos.hook';
import { todosLoader } from '@todo/pages/Todos/Todos.loader';
import { useLoaderData } from 'react-router-dom';

export default function useTodosList() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof todosLoader>>
  >;
  const [t] = useI18n();
  const todosQuery = useTodos({ initialData });

  return { t, todosQuery };
}
