export interface Props { 
	[key: string]: React.ReactNode
}

export interface PropsReactNodeArr { 
	[key: string]: React.ReactNode[]
}

export type Date = {
	Date:{
		id: string,
		type: string,
		date:{
			 start: string,
			 end: string,
			 time_zone:null
		}
 }
}

export type Tags = {
	Tags:{
		id: string,
		type: string,
		multi_select:{
			id: string,
			name: string,
			color: string
		}[]
 },
}

export type Description = {
	Description:{
		id: string,
		type: string,
		rich_text:{
			type: string,
			text:{
				content: string,
				link: null
			},
			annotations:{
				bold: boolean,
				italic: boolean,
				strikethrough: boolean,
				underline: boolean,
				code: boolean,
				color: string
			},
			plain_text: string,
			href:null
		}[]
	}
}

export type Url = {
	URL:{
		id: string,
		type: string,
		url: string
 }
}

export type Name = {
	Name:{
		id: string,
		type: string,
		title:{
			type:string,
			text:{
					content:string,
					link:null
			},
			annotations:{
				bold: boolean,
				italic: boolean,
				strikethrough: boolean,
				underline: boolean,
				code: boolean,
				color: string
			},
			plain_text:string,
			href:null
		}[]
	}
}

export type DataType = {
	object?:string,
	id?:string,
	created_time?:string,
	last_edited_time?:string,
	properties: Date & Tags & Description & Url & Name
}


export type DataTypeResults = {
	results: DataType[]
}