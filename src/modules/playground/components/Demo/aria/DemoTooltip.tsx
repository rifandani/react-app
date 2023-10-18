import {
  Button,
  OverlayArrow,
  Tooltip,
  TooltipProps,
  TooltipTrigger,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

interface MyTooltipProps extends Omit<TooltipProps, 'children'> {
  children: React.ReactNode;
}

function DaisyTooltip() {
  return (
    <div className="tooltip" data-tip="hello">
      <button className="btn" type="button">
        Daisy
      </button>
    </div>
  );
}

function MyTooltip({ children, className, ...props }: MyTooltipProps) {
  return (
    <Tooltip
      className={(classProps) =>
        twMerge(
          'rounded-md outline outline-1 outline-black rac-entering:animate-in rac-entering:fade-in-0 rac-exiting:animate-out rac-exiting:fade-out-0',
          classProps.placement === 'left' &&
            'rac-entering:slide-in-from-right-1 rac-exiting:slide-in-from-left-1',
          classProps.placement === 'right' &&
            'rac-entering:slide-in-from-left-1 rac-exiting:slide-in-from-right-1',
          classProps.placement === 'top' &&
            'rac-entering:slide-in-from-bottom-1 rac-exiting:slide-in-from-top-1',
          classProps.placement === 'bottom' &&
            'rac-entering:slide-in-from-top-1 rac-exiting:slide-in-from-bottom-1',
          typeof className === 'string' ? className : className?.(classProps),
        )
      }
      {...props}
    >
      {({ placement }) => (
        <>
          <OverlayArrow>
            <svg
              width={8}
              height={8}
              className={twMerge(
                placement === 'left' && '-rotate-90',
                placement === 'right' && 'rotate-90',
                placement === 'bottom' && 'rotate-180',
              )}
            >
              <path d="M0 0,L4 4,L8 0" />
            </svg>
          </OverlayArrow>

          {children}
        </>
      )}
    </Tooltip>
  );
}

export default function DemoTooltip() {
  return (
    <section className="flex flex-wrap gap-3 rounded border p-3">
      <DaisyTooltip />

      <TooltipTrigger delay={1} closeDelay={1}>
        <Button className="btn">Top</Button>
        <MyTooltip offset={10}>Content</MyTooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={1} closeDelay={1}>
        <Button className="btn">Bottom</Button>
        <MyTooltip placement="bottom" offset={10}>
          Content
        </MyTooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={1} closeDelay={1}>
        <Button className="btn">Left</Button>
        <MyTooltip placement="left" offset={10}>
          Content
        </MyTooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={1} closeDelay={1}>
        <Button className="btn">Right</Button>
        <MyTooltip placement="right" offset={10}>
          Content
        </MyTooltip>
      </TooltipTrigger>
    </section>
  );
}
