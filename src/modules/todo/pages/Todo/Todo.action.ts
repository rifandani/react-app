import { queryClient } from '@app/providers/query/client';
import { todoApi, todoKeys } from '@todo/apis/todo.api';
import { todosPath } from '@todo/routes/todos.route';
import { UpdateTodoSchema } from '@todo/schemas/todo.schema';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

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

      toast.success('Todo successfully updated');
      return redirect(todosPath.root);
    }

    toast.warning('Not Implemented');
    return new Response('Not Implemented', { status: 501 });
  };
