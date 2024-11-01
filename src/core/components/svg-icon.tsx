import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  id: 'icon-reactjs';
}

export function SvgIcon({ id, ...rest }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" {...rest}>
      <title>{id}</title>
      <use href={`#${id}`} />
    </svg>
  );
}
