import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  clicl: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 1 } },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    x.on("change", () => console.log(x.get()));
  }, [x]);

  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <button onClick={() => x.set(200)}>click me</button>
        <Box style={{ x }} drag="x" dragSnapToOrigin />
      </BiggerBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bgColor};
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

export default App;
