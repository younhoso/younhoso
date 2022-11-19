import styled from "styled-components";
import { Link } from 'react-router-dom';

function Menu() {

  return (
    <MenuInner>
       <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/Cards"}>Cards</Link>
        </li>
      </ul>
    </MenuInner>
  )
}

const MenuInner = styled.div`
  text-align: center;
  padding: 10px 0;
  li {
    display: inline-block;
    margin-left: 10px;
  }
  a {font-size: 16px;}
`

export default Menu;