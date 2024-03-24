import { Button } from '#shared/components/ui/button';
import { Popover } from '#shared/components/ui/popover';
import { Icon } from '@iconify/react';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import {
  DatePicker,
  DateRangePicker,
  Dialog,
  Group,
  type DateRangePickerProps,
  type DateValue,
  type DialogProps,
  type GroupProps,
  type PopoverProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _DatePicker = DatePicker;

const _DateRangePicker = DateRangePicker;

export interface _DatePickerButtonProps extends GroupProps {
  date?: DateValue;
}

const _DatePickerButton = ({ date, ...props }: _DatePickerButtonProps) => (
  <Group {...props}>
    <Button
      variant="outline"
      className={twMerge(
        'w-[280px] justify-start text-left font-normal',
        !date && 'text-muted-foreground',
      )}
    >
      <Icon icon="lucide:calendar" className="mr-2 h-4 w-4" />

      {date ? (
        new DateFormatter(getLocalTimeZone(), { dateStyle: 'long' }).format(
          date.toDate(getLocalTimeZone()),
        )
      ) : (
        <span>Pick a date</span>
      )}
    </Button>
  </Group>
);

export interface _DateRangePickerButtonProps extends GroupProps {
  date?: DateRangePickerProps<DateValue>['value'];
}

const _DateRangePickerButton = ({
  date,
  ...props
}: _DateRangePickerButtonProps) => (
  <Group {...props}>
    <Button
      variant="outline"
      className={twMerge(
        'w-[280px] justify-start text-left font-normal',
        !date && 'text-muted-foreground',
      )}
    >
      <Icon icon="lucide:calendar" className="mr-2 h-4 w-4" />

      {date?.end ? (
        <>
          {`${new DateFormatter(getLocalTimeZone(), {
            dateStyle: 'medium',
          }).format(
            date.start.toDate(getLocalTimeZone()),
          )} - ${new DateFormatter(getLocalTimeZone(), {
            dateStyle: 'medium',
          }).format(date.end.toDate(getLocalTimeZone()))}`}
        </>
      ) : (
        <span>Pick a date</span>
      )}
    </Button>
  </Group>
);

const _DatePickerContent = ({
  className,
  popoverClassName,
  ...props
}: DialogProps & { popoverClassName?: PopoverProps['className'] }) => (
  <Popover
    className={(values) =>
      twMerge(
        'w-auto p-3',
        typeof popoverClassName === 'function'
          ? popoverClassName(values)
          : popoverClassName,
      )
    }
  >
    <Dialog
      className={twMerge(
        'flex w-full flex-col space-y-4 outline-none sm:flex-row sm:space-x-4 sm:space-y-0',
        className,
      )}
      {...props}
    />
  </Popover>
);

export {
  _DatePicker as DatePicker,
  _DatePickerButton as DatePickerButton,
  _DatePickerContent as DatePickerContent,
  _DateRangePicker as DateRangePicker,
  _DateRangePickerButton as DateRangePickerButton,
};
