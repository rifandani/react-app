import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  id: 'icon-reactjs';
}

export default function SvgIcon({ id, ...rest }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      {...rest}
    >
      <use href={`#${id}`} />
    </svg>
  );
}
