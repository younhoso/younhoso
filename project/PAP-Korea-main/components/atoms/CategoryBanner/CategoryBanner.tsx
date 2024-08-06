import Sensor from '~/components/templates/Sensor';
import SlideImages from '~/components/templates/SlideImages';
import { numberToRem } from '~/utils/rem';

import { CategoryBannerStyled } from './styled';

import clsx from 'clsx';

interface CategoryBannerProps {
  className?: string;
  image?: any;
  content?: string;
}

const CategoryBanner = ({ className, image, content }: CategoryBannerProps) => {
  return (
    <Sensor once>
      {({ isVisible }) => (
        <>
          {isVisible ? (
            <CategoryBannerStyled className={clsx('CategoryBanner', className)}>
              {image && <SlideImages src={image} heightSize="full" />}
              <div className="content">
                <p>{content}</p>
              </div>
            </CategoryBannerStyled>
          ) : (
            <div
              style={{
                width: 'calc(100vw - 3rem)',
                height: numberToRem(10, 1),
              }}
            />
          )}
        </>
      )}
    </Sensor>
  );
};

export default CategoryBanner;
