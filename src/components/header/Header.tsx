import React from 'react';
import { FC } from 'react';

type Props = {
  text: string;
  size: 1 | 2 | 3;
  className: string;
};

export const Header: FC<Props> = ({ text, size, className }) => {
  const Tag = `h${size}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{text}</Tag>;
};
