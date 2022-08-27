import { useEffect, useState } from "react";

export default function useFetch(url: string) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchSet = async () => {
			const res = await fetch(url);
			if(!res.ok){
				throw new Error('데이터 불러오는데 실패했습니다.')
			}
			setData(await res.json());
		}
		fetchSet();
	},[]);

	return data
}