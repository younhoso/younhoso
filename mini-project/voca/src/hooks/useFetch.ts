import { useEffect, useState } from "react";

export function useGetFetch(url: string) {
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
	},[url]);

	return data
};