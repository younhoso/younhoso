import useFullScreen from '../hooks/useFullScreen';

const UseFullScreenComp = () => {
  const { element, isFull, triggerFull, exitFull } = useFullScreen();
  return (
    <>
      <div ref={element}>
        <img
          src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="example"
          style={{ width: 1024, height: 'auto' }}
        />
        {isFull && <button onClick={exitFull}>Exit FullScreen</button>}
      </div>
      <button onClick={triggerFull}>Make FullScreen</button>
    </>
  );
};

export default UseFullScreenComp;
