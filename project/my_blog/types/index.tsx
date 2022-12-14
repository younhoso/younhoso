export interface Props { 
	[key: string]: React.ReactNode
}

export interface PropsReactNodeArr { 
	[key: string]: React.ReactNode[]
}

export type DataType = {
	object:string,
	id:string,
	created_time:string,
	last_edited_time:string,
	properties: {
		Date: {
			id: string,
			type: string,
			date: {
				start: string,
				end: string,
				time_zone: null
			}
		}
	}
}

export type DataTypeResults = {
	results: DataType[]
}