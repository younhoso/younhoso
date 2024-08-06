import { useRef } from 'react';
import ReactPlayer from 'react-player';

import { useGet } from '~/apis';
import Sensor from '~/components/templates/Sensor';
import SlideImages from '~/components/templates/SlideImages';

import { EventBannerStyled } from './styled';

import clsx from 'clsx';

interface EventBannerProps {
  className?: string;
}

const EventBanner = ({ className }: EventBannerProps) => {
  const useR = useRef(null);
  const {
    data: getData,
    isLoading,
    reload,
  } = useGet('/mainEventBanner/getData');

  const bannerData = isLoading ? [] : getData?.[0];

  return (
    <>
      {!isLoading && (
        <EventBannerStyled className={clsx('EventBanner', className)}>
          <div className="background">
            {bannerData?.viewType == 'video' ? (
              <ReactPlayer
                url={bannerData?.videoLink}
                muted={true}
                playing={true}
                width={'100vw'}
                height={900}
                loop={true}
                controls={false}
              />
            ) : (
              <>
                <img src={bannerData?.image?.url} alt="" />
              </>
            )}
          </div>
          <Sensor>
            {({ isVisible: isVisible }) => (
              <>
                {isVisible ? (
                  <div className="contentInfo ani">
                    <h2>{bannerData?.content}</h2>
                    <p>{bannerData?.subContent}</p>
                  </div>
                ) : (
                  <div
                    className="contentInfo"
                    style={{ width: '100px', height: '102px' }}
                  ></div>
                )}
              </>
            )}
          </Sensor>
        </EventBannerStyled>
      )}
    </>
  );
};

export default EventBanner;
