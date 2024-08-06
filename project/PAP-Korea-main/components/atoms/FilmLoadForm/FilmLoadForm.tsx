import { FilmLoadFormStyled } from './styled';

import clsx from 'clsx';

interface FilmLoadFormProps {
  className?: string;
}

const FilmLoadForm = ({ className }: FilmLoadFormProps) => {
  return (
    <FilmLoadFormStyled className={clsx('FilmLoadForm', className)}>
      {Array(12)
        .fill('')
        .map((x: any, i: number) => (
          <div className="LoadItem" key={i}>
            <div className="Loadimg" />
            <div className="LoadDate" />
            <div className="LoadTitle" />
          </div>
        ))}
    </FilmLoadFormStyled>
  );
};

export default FilmLoadForm;
