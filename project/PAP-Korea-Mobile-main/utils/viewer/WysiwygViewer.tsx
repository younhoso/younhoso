import { Viewer as ViewerType, ViewerProps } from '@toast-ui/react-editor';
import * as React from 'react';

import dynamic from 'next/dynamic';

import { TuiViewerWithForwardedProps } from './TuiViewerWrapper';

interface ViewerPropsWithHandlers extends ViewerProps {
  initialValue?: any;
  height?: any;
}

const Viewer = dynamic<TuiViewerWithForwardedProps>(
  () => import('./TuiViewerWrapper'),
  { ssr: false },
);
const ViewerWithForwardedRef = React.forwardRef<
  ViewerType | undefined,
  ViewerPropsWithHandlers
>((props, ref) => (
  <Viewer {...props} forwardedRef={ref as React.MutableRefObject<ViewerType>} />
));

interface Props extends ViewerProps {
  initialValue?: any;
  height?: any;

  valueType?: 'markdown' | 'html';
}

const WysiwygViewer: React.FC<Props> = props => {
  const { initialValue } = props;

  const ViewerRef = React.useRef<ViewerType>();

  return (
    <div>
      <ViewerWithForwardedRef
        {...props}
        initialValue={initialValue || ''}
        height={'auto'}
        ref={ViewerRef}
      />
    </div>
  );
};

export default WysiwygViewer;
