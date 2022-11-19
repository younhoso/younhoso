import { useEffect, useState } from 'react';
import styled from "styled-components";
import {mockItems} from '../mockData';

export interface MockItem {
  id:     number,
  title:  string,
  imgUrl: string,
  price:  string
}

interface Props {
	txt: string
}

function Cards({txt}: Props) {
	const [items, setItems] = useState<MockItem[]>([]);
	const handleLoade = () => {
		setItems(mockItems)
	};

	useEffect(() => {
		handleLoade();
	},[])

  return (
    <CardInner>
			
			{/* <ul>
				<li>knivesddd</li>
				<li>boards</li>
				<li>cheese</li>
				<li>surplus</li>
			</ul> */}
			{items.map((item) => {
				return(
					<CardItem key={item.id}>
						<img src={item.imgUrl} />
						<div className="item-detail">
							<h2>{item.title}</h2>
							<div><p>{item.price}</p></div>
						</div>
					</CardItem>
				)
			})}
			
    </CardInner>
  )
}

const CardInner = styled.ul`
	display: block;
`
const CardItem = styled.li`
	width: 25%;
	display: inline-block;
	padding: 0 5px;
	box-sizing: border-box;
	@media screen and (max-width: 768px) {
		width: 50%;
	}
	img {width: 100%;}
`


export default Cards;