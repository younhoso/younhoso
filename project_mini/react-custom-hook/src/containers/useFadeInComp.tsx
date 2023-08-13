import useFadeIn from '../hooks/useFadeIn';

const UseFadeInComp = () => {
  const fadeInH1 = useFadeIn(1, 1);
  const fadeInP = useFadeIn(2, 2);
  const fadeDiv = useFadeIn(3, 3);

  return (
    <>
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>lorem blabla</p>
      <div {...fadeDiv}>div element</div>
    </>
  );
};

export default UseFadeInComp;
