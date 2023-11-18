import useScroll from '../hooks/useScroll';

const UseScrollComp = () => {
  const { y } = useScroll();

  return (
    <div style={{ height: '200vh' }}>
      <h1 style={{ position: 'fixed', color: y > 100 ? 'red' : 'blue' }}>Hi</h1>
    </div>
  );
};

export default UseScrollComp;
