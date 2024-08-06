import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import React from 'react';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import '@toast-ui/editor/dist/i18n/ko-kr';
import DOMPurify from 'isomorphic-dompurify';

export interface TuiViewerWithForwardedProps extends ViewerProps {
  forwardedRef?: React.MutableRefObject<Viewer>;
}

const purifyOptions = {
  ADD_TAGS: ['iframe', 'embed'],
};

export default (props: TuiViewerWithForwardedProps) => (
  <Viewer
    {...props}
    ref={props.forwardedRef}
    customHTMLSanitizer={html => {
      return DOMPurify.sanitize(html, purifyOptions);
    }}
  />
);
