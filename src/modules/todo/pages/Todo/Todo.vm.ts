import { useUserStore } from '@auth/stores/useUser/useUser.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { UpdateTodoSchema, updateTodoSchema } from '@todo/api/todo.schema';
import { useTodo } from '@todo/hooks/useTodo/useTodo.hook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher, useLoaderData, useParams } from 'react-router-dom';
import { todoLoader } from './Todo.loader';

export default function useTodoPageVM() {
  const [t] = useI18n();
  const { id } = useParams();
  const fetcher = useFetcher();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof todoLoader>>
  >;
  const { user } = useUserStore();
  const todoQuery = useTodo(Number(id), { initialData });

  const form = useForm<UpdateTodoSchema>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      id: initialData.id,
      completed: initialData.completed,
      todo: initialData.todo,
    },
  });

  // #region HANDLERS
  const onSubmit: SubmitHandler<UpdateTodoSchema> = (values) => {
    fetcher.submit(values, { method: 'PUT', encType: 'application/json' });
  };
  // #endregion

  return { t, user, fetcher, todoQuery, form, onSubmit };
}