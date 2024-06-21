export interface IParams {
	list: string[] | {
		[key: string | number]: any
	}[]
	keyName?: string
	defaulValue?: number
	onSelect?: (key: number) => void
	title: string
}