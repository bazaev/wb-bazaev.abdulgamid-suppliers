export interface ICity {
	id: number,
	name: string
}

export interface IInitialState {
	cities: ICity[] | undefined,
	loading: boolean,
	error: string | undefined
}

export interface IAction {
	type: string,
	payload: ICity[]
}