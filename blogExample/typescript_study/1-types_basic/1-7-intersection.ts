{
/**
 * 모든것을 다 합한 성격을 말합니다.
 * Intersection Types: &
 */	

	type Student = {
		name: string;
		score: number;
	}

	type Worker = {
		empolyeeId: number;
		work: () => void;
	}

	function internWork(person: Student & Worker) {
		console.log(person.name, person.empolyeeId, person.work());
	}

	/** 이렇게 위에서 작성한 Student type과 Worker type을 모두 작성을 해줘야 에러를 피할수 있습니다. */
	internWork({
		name: 'TriplexLab',
		score: 20,
		empolyeeId: 123,
		work: () => {},
	})
}