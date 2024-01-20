import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const boxVariants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    option: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [isBack, setIsBack] = useState(false);
  const prevPlease = () => {
    setIsBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const nextPlease = () => {
    setIsBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };

  return (
    <Wrapper>
      <AnimatePresence custom={isBack}>
        <Box
          custom={isBack}
          key={visible}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prevPlease}>prev</button>
      <button onClick={nextPlease}>next</button>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  height: 100vw;
  align-items: center;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: #fff;
    margin-left: 10px;
  }
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

export default App;
