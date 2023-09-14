import { PropsWithChildren } from 'react';
import { Button } from 'react-aria-components';

interface Props extends PropsWithChildren {
  id: string;
  title: string;
  description: string;
}

export default function Modal({ id, title, description, children }: Props) {
  return (
    <dialog className="modal modal-bottom sm:modal-middle" id={id}>
      <form method="dialog" className="modal-backdrop">
        {/* if there is a button in form, it will close the modal */}
        <Button type="submit">close</Button>
      </form>

      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <Button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            type="submit"
          >
            ✕
          </Button>
        </form>

        <h1 className="text-lg font-bold">{title}</h1>
        <p className="pt-4">{description}</p>

        {children && <footer className="modal-action">{children}</footer>}
      </div>
    </dialog>
  );
}
