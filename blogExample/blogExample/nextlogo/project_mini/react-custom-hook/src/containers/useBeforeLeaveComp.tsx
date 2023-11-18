import useBeforeLeave from '../hooks/useBeforeLeave';

const UseBeforeLeaveComp = () => {
  const begForNotLeave = () => console.log('Pls dont leave');
  useBeforeLeave(begForNotLeave);

  return <div>Try to move mouse to outside of screen</div>;
};

export default UseBeforeLeaveComp;
