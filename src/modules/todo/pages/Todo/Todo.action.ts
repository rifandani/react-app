import { queryClient } from '@app/providers/query/queryClient';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { UpdateTodoSchema } from '@todo/api/todo.schema';
import { todosPath } from '@todo/routes/todos.route';
import { ActionFunctionArgs, redirect } from 'react-router-dom';

export const todoAction =
  (_queryClient: typeof queryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    if (request.method === 'PUT') {
      const queryKeyLists = todoKeys.lists();
      const queryKeyDetail = todoKeys.detail(Number(params.id));
      const payload = (await request.json()) as UpdateTodoSchema;
      await todoApi.update(payload);

      // remove the todos cache
      _queryClient.removeQueries({ queryKey: queryKeyLists });
      _queryClient.removeQueries({ queryKey: queryKeyDetail });
      // invalidate only change the status to inactive, the cache is still there
      // await _queryClient.invalidateQueries({ queryKey: queryKeyLists }); // `await` is the "lever"

      return redirect(todosPath.root);
    }

    return new Response('Not Implemented', { status: 501 });
  };
