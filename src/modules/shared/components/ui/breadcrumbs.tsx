import { Icon } from '@iconify/react';
import {
  Breadcrumb,
  Breadcrumbs,
  Link,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  type LinkProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _Breadcrumbs = <T extends object>({
  className,
  ...props
}: BreadcrumbsProps<T>) => (
  <Breadcrumbs
    className={twMerge(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      className,
    )}
    {...props}
  />
);

const BreadcrumbItem = ({ className, ...props }: BreadcrumbProps) => (
  <Breadcrumb
    className={twMerge(
      'inline-flex items-center gap-1.5 sm:gap-2.5',
      className,
    )}
    {...props}
  />
);

const BreadcrumbLink = ({ className, ...props }: LinkProps) => (
  <Link
    className={(values) =>
      twMerge(
        'transition-colors hover:text-foreground data-[disabled]:pointer-events-none data-[current]:pointer-events-auto data-[current]:opacity-100 data-[disabled]:opacity-50',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={twMerge('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children || <Icon icon="lucide:chevron-right" />}
  </span>
);

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={twMerge('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <Icon icon="lucide:more-horizontal" className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);

interface BreadcrumbPageProps extends Omit<LinkProps, 'href'> {}

const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  <Link
    className={(values) =>
      twMerge(
        'font-normal text-foreground',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

export {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  _Breadcrumbs as Breadcrumbs,
};
