import React from "react";
import styles from "./Hello.module.css"

const Hello = () => {
	return (
		<div>
			<div className={styles.box}>{styles.box}</div>
		</div>
	)
}
export default Hello;