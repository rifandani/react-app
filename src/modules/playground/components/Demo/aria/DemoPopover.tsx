/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogTrigger,
  Popover,
  PopoverProps,
} from 'react-aria-components';

interface MyPopoverProps extends Omit<PopoverProps, 'children'> {
  children: React.ReactNode;
}

function DaisyPopover() {
  return (
    <div className="flex items-center">
      <p>Daisy popover</p>
      <div className="dropdown dropdown-bottom">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          tabIndex={0}
          className="btn btn-circle btn-ghost btn-xs text-info"
        >
          <Icon icon="lucide:info" />
        </label>

        <div
          tabIndex={0}
          className="card dropdown-content compact rounded-box z-[1] w-64 bg-base-100 shadow"
        >
          <div className="card-body">
            <h2 className="card-title">You needed more info?</h2>
            <p>Here is a description!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyPopover({ children, ...props }: MyPopoverProps) {
  return (
    <Popover className="rounded border p-3 outline-none" {...props}>
      {/* <OverlayArrow>
        {({ placement }) => (
          <Icon
            icon="lucide:chevron-up"
            className={twJoin(
              'block',
              placement === 'top' && 'rotate-180',
              placement === 'right' && '-rotate-90',
              placement === 'left' && 'rotate-90',
            )}
          />
        )}
      </OverlayArrow> */}
      <Dialog>{children}</Dialog>
    </Popover>
  );
}

function AriaPopover() {
  return (
    <div className="flex gap-3">
      <DialogTrigger>
        <Button>⬅️</Button>
        <MyPopover placement="start">
          In left-to-right, this is on the left. In right-to-left, this is on
          the right.
        </MyPopover>
      </DialogTrigger>
      <DialogTrigger>
        <Button>⬆️</Button>
        <MyPopover placement="top" offset={0}>
          This popover is above the button.
        </MyPopover>
      </DialogTrigger>
      <DialogTrigger>
        <Button>⬇️</Button>
        <MyPopover placement="bottom">
          This popover is below the button.
        </MyPopover>
      </DialogTrigger>
      <DialogTrigger>
        <Button>➡️</Button>
        <MyPopover placement="end">
          In left-to-right, this is on the right. In right-to-left, this is on
          the left.
        </MyPopover>
      </DialogTrigger>
    </div>
  );
}

export default function DemoPopover() {
  return (
    <section className="flex flex-wrap gap-3">
      <DaisyPopover />

      <div className="divider divider-horizontal">atau</div>

      <AriaPopover />
    </section>
  );
}
