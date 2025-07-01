import React from 'react';
import { FC } from 'react';
import { UserBlock } from '../UserBlock/UserBlock';

type Props = {
  text: string;
  size: 1 | 2 | 3;
  className: string;
};

export const Header: FC<Props> = ({ text, size, className }) => {
  const Tag = `h${size}` as keyof React.JSX.IntrinsicElements;

  return (
    <header>
      <Tag className={className}>{text}</Tag>
      <UserBlock />
    </header>
  );
};
