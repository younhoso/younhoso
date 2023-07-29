import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css"

const Header = () => {
	return (
		<div className="header">
			<h1>
				<Link to="/">토익 영단어(고급)</Link>
			</h1>
			<div className="memu">
				<Link to="/create_word" className={styles.link}>단어 추가</Link>
				<Link to="/create_day" className={styles.link}>Day 추가</Link>
			</div>
		</div>
	)
}
export default Header;