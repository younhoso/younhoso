const $ = (select) => document.querySelector(select);
(() => {
	const getDatas = async () => {
		const res = await fetch("mock.json");
		if(!res.ok){ // 이렇게 데이터 불러오는데 실패하면 에러 메세지를 넣을수 있습니다.
			throw new Error('데이터 불러오는데 실패했습니다')
		}
		const body = await res.json();
		return body;
	}

	const tempHtml = (datas) => {
		return datas.map((item) => {
			const {title, imgUrl, createdAt, rating} = item
			const date = new Date(createdAt);
			return (`<li>
							<div>
								${title}
							</div>
							<img src=${imgUrl}>
							<div>${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}</div>
							<div>${rating}</div>
						</li>
					`)
		}).join('');
	};

	const handleLoad = async () => {
		await getDatas().then(datas => {
			$(".App").innerHTML = tempHtml(datas)
		}).catch((err) => {
			console.log(err);
      return;
		})
	};

	const handleNewestClick = async (order) => {
		const datas = await getDatas();
		const sortedItems = datas.sort((a,b) => b[order] - a[order]);
		$(".App").innerHTML = tempHtml(sortedItems)
	}

  const handleBestClick = async (order) => {
		const datas = await getDatas();
		const sortedItems = datas.sort((a,b) => b[order] - a[order]);
		$(".App").innerHTML = tempHtml(sortedItems)
	};

	$('.newes').addEventListener('click', () => {
		handleNewestClick('createdAt')
	})
	$('.best').addEventListener('click', () => {
		handleBestClick('rating')
	})

	handleLoad();	
})();