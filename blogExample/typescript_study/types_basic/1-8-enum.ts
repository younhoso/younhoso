{
	/**
	 * Enum
	 * 여러가지 상수관련된 것들을 한곳에 모아서 정의할수 있게 도와주는 타입
	 */	
	// JavaScript
	const MAX_NUM = 6;
	const MAX_STUDENTS_PER_CLASS = 10;
	const MONDAY = 0;
	const TUESDAY = 1;
	const WEDNESDAY = 2;
	// 자바스크립트에서는 다음과 같이 관련된 상수를 한곳에 모아높은 방법입니다.
	const DAYS_ENUM = Object.freeze({
		"MONDAY": 0, 
		"TUESDAY": 1,
		"WEDNESDAY": 2
	});

	const dayOfToday = DAYS_ENUM.MONDAY;

	// TypeScript
	// 타입스크립트에서 Enum개념을 제공합니다.
	enum Days {
		Monday = 'monday',
		Tuesday = 'tuesday',
		Wednesday = 'wednesday',
		Thursday = 'thursday',
		Friday = 'friday', 
		Saturday = 'saturday',
		Sunday = 'sunday',
	}
	console.log(Days.Tuesday);
	let day: Days = Days.Saturday;
	day = Days.Tuesday;
}
