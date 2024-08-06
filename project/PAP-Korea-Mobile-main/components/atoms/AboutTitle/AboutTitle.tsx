import { AboutTitleStyled } from './styled';

import clsx from 'clsx';
import AnimatedText from 'react-animated-text-content';
import { useMemo } from 'react';

interface AboutTitleProps {
  className?: string;
  title?: any;
}

const AboutTitle = ({ className, title }: AboutTitleProps) => {

  const Text = useMemo(() => <AnimatedText
    type="chars"
    animationType="bounce"
    interval={0.06}
    duration={0.8}
    tag="p"
    includeWhiteSpaces
    threshold={0.1}
    rootMargin="20%"
  >
    {title}
  </AnimatedText>, [])

  return (
    <AboutTitleStyled className={clsx('AboutTitle', className)}>
      <p>
        {title}
      </p>
      {/* {Text} */}
    </AboutTitleStyled>
  );
};

export default AboutTitle;
