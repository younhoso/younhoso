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
    data: topData,
    isLoading: topLoading,
    reload: topReload,
  } = useGet('/post/getData', {
    qs: {
      sort: {
        createdAt: 'DESC',
      },
      // pagination: { start: 0, limit: 2 },
      options: { offset: 0, limit: 2 },
    },
  });

  const {
    data: bottomData,
    isLoading: bottomLoading,
    reload: bottomReload,
  } = useGet('/post/getData', {
    qs: {
      sort: {
        createdAt: 'DESC',
      },
      // options: { pagination: { start: 2, limit: 10 } },
      options: { limit: 12, offset: 2 },
    },
  });

  return (
    <>
      {!topLoading && !bottomLoading && (
        <EditorialStyled className={clsx('Editorial', className)}>
          <Title
            className="title"
            title="EDITORIAL"
            type="center"
            size="default"
          />
          <div className="editorialSlide">
            <MainSlide
              notSensor={true}
              grid={2}
              data={topData}
              heightSize="ediLarge"
            />
          </div>
          <div className="editorialSlide bottom">
            <MainSlide
              className="ani"
              grid={4}
              data={bottomData?.slice(2)}
              heightSize="ediNormal"
            />
          </div>
        </EditorialStyled>
      )}
    </>
  );
};

export default Editorial;
