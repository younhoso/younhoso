import { useGet } from '~/apis';
import MainSlide from '~/components/templates/MainSlide';
import Title from '~/components/templates/Title';

import { EditorialStyled } from './styled';

import clsx from 'clsx';

interface EditorialProps {
  className?: string;
}

const Editorial = ({ className }: EditorialProps) => {
  const {
    data: getData,
    isLoading,
    reload,
  } = useGet('/post/getData', {
    qs: {
      sort: {
        createdAt: 'DESC',
      },
      options: { offset: 0, limit: 10 },
    },
  });

  const editorialData = isLoading ? [] : getData;

  return (
    <EditorialStyled className={clsx('Editorial', className)}>
      <Title className="title" title="EDITORIAL" type="center" size="default" />
      {!isLoading && (
        <div className="editorialSlide">
          <MainSlide
            center
            auto
            notSensor={true}
            grid={1.4}
            data={getData}
            heightSize="ediBottom"
          />
        </div>
      )}
    </EditorialStyled>
  );
};

export default Editorial;
