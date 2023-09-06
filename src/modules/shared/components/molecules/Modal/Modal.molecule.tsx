import { PropsWithChildren } from 'react';

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
        <button type="submit">close</button>
      </form>

      <div className="modal-box bg-accent">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            type="submit"
          >
            ✕
          </button>
        </form>

        <h1 className="text-lg font-bold text-accent-content">{title}</h1>
        <p className="pt-4 text-accent-content">{description}</p>

        {children && <footer className="modal-action">{children}</footer>}
      </div>
    </dialog>
  );
}
