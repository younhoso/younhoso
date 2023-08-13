import useClick from '../hooks/useClick';

const UseClickComp = () => {
  const sayHello = () => alert('hello');
  const title = useClick(sayHello);

  return <div ref={title}>hello</div>;
};

export default UseClickComp;
