import React from 'react';
import { Link } from 'react-router-dom';

export default function Title({ url, title, id }: TitleProps) {
  return url ? (
    <a className='link' href={url}>
      {title}
    </a>
  ) : (
    <Link className='link' to={`/post?id=${id}`}>
      {title}
    </Link>
  );
}

type TitleProps = {
  url: string;
  title: string;
  id: number;
};
