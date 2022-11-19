import styled from 'styled-components';
import Seo from '../components/Seo';

export default function Home() {
  return (
    <div>
      <Seo title='Home' />
      <BtnWrap>Next.js + Typescript + Styled-components</BtnWrap>
    </div>
  )
}

const BtnWrap = styled.div`
  cursor: pointer;
  background-color: aqua;
`;

