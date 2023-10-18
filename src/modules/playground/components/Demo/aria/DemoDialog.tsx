import DaisyModal from '@shared/components/molecules/Modal/Modal.molecule';
import { useId } from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components';

function AriaDialog() {
  return (
    <DialogTrigger>
      <Button className="btn btn-sm">Aria Dialog</Button>

      <ModalOverlay className="fixed inset-0 z-10 backdrop-blur-sm data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0">
        <Modal className="flex h-full items-center justify-center data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:zoom-in-0 data-[exiting]:zoom-out-0">
          <Dialog role="alertdialog" className="modal-box">
            {({ close }) => (
              <>
                <h1 className="text-xl font-bold">Are you absolutely sure?</h1>

                <p className="pt-3">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>

                <footer className="modal-action space-x-3">
                  <Button className="btn btn-outline btn-sm" onPress={close}>
                    Cancel
                  </Button>
                  <Button className="btn btn-primary btn-sm" onPress={close}>
                    Continue
                  </Button>
                </footer>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

function DaisyDialog() {
  const id = useId();

  const onPressOpenDialog = () => {
    // @ts-expect-error daisyUI modal method utilizing `dialog` element with `id`
    const modal = window[id] as HTMLDialogElement;
    modal.showModal();
  };

  const onPressCloseDialog = () => {
    // @ts-expect-error daisyUI modal method utilizing `dialog` element with `id`
    const modal = window[id] as HTMLDialogElement;
    modal.close();
  };

  return (
    <>
      <Button className="btn btn-outline btn-sm" onPress={onPressOpenDialog}>
        Daisy Dialog
      </Button>

      <DaisyModal id={id}>
        <h1 className="text-lg font-bold">Are you absolutely sure?</h1>
        <p className="pt-4">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </p>

        <footer className="modal-action space-x-3">
          <Button
            className="btn btn-outline btn-sm"
            onPress={onPressCloseDialog}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary btn-sm"
            onPress={onPressCloseDialog}
          >
            Continue
          </Button>
        </footer>
      </DaisyModal>
    </>
  );
}

export default function DemoDialog() {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <AriaDialog />
      <DaisyDialog />
    </section>
  );
}
