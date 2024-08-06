import { Transition, TransitionGroup } from 'react-transition-group';

import { useRouter } from 'next/router';

import { MotionComponentStyled } from './styled';

import clsx from 'clsx';

interface MotionComponentProps {
  children?: any;
  className?: string;
  onWheel?: any;
}

const getTransitionStyles: Record<any, any> = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${400}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${400}ms ease-in-out`,
    opacity: 0,
  },
};

const MotionComponent = ({
  children,
  className,
  onWheel,
}: MotionComponentProps) => {
  const router = useRouter();

  return (
    <MotionComponentStyled
      className={clsx('MotionComponent', className)}
      onWheel={onWheel}
    >
      <TransitionGroup style={{ position: 'relative' }}>
        <Transition
          key={router.pathname}
          timeout={{
            enter: 200,
            exit: 200,
          }}
        >
          {(status: any) => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </MotionComponentStyled>
  );
};

export default MotionComponent;
