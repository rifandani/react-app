import { Modal } from '@shared/components/molecules';
import { Button } from 'react-aria-components';
import useTodosCreate from './useTodosCreate.hook';

export default function TodosCreate() {
  const { t, modalId, form, onSubmit } = useTodosCreate();

  return (
    <>
      <Modal
        id={modalId}
        title="Unsaved Changes"
        description={t('unsavedChanges')}
      />

      <form
        aria-label="form-add"
        className="form-control mb-3 w-full duration-300 lg:flex-row"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <input
          id="todo"
          type="text"
          aria-label="textbox-add"
          className="input input-bordered input-primary w-full lg:w-10/12"
          placeholder={t('todoPlaceholder')}
          {...form.register('todo', { required: true, minLength: 3 })}
        />

        <Button
          aria-label="button-add"
          className="btn btn-primary ml-0 mt-2 w-full normal-case text-primary-content disabled:btn-disabled lg:ml-2 lg:mt-0 lg:w-2/12"
          type="submit"
          isDisabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {t('add', { icon: '💾' })}
        </Button>
      </form>
    </>
  );
}
