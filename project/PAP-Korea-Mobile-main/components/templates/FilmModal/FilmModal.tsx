import { GrFormClose } from 'react-icons/gr';
import ReactPlayer from 'react-player';

import { FilmModalStyled } from './styled';

import clsx from 'clsx';

interface FilmModalProps {
  className?: string;
  open: any;
  isClose: Function;
  data: any;
  nowSlide: number;
}

const FilmModal = ({
  className,
  open,
  isClose,
  data,
  nowSlide,
}: FilmModalProps) => {
  return (
    <FilmModalStyled className={clsx('FilmModal', className, open && 'open')}>
      <button className="closeButton" onClick={() => isClose()}>
        <GrFormClose fontSize="5rem" color="white" style={{ color: 'white' }} />
      </button>

      <div>{/* <ReactPlayer /> */}</div>
    </FilmModalStyled>
  );
};

export default FilmModal;
