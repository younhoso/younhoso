import { Fragment } from 'react';

export default async function Loading() {
  return (
    <Fragment>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10 overflow-hidden"></div>
      <div className="loader fixed top-1/2 left-1/2 w-12 h-12 border-4 border-white border-opacity-100 border-b-[#FF3D00] rounded-full z-11 animate-spin"></div>
    </Fragment>
  );
}
