import styled from "styled-components";
import { motion } from "framer-motion";

function App() {
  return (
    <Wrapper>
      <Box
        initial={{ scale: 0 }}
        transition={{ type: "spring", delay: 0.5 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bgColor};
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

export default App;
