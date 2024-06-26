export interface ICity {
	id: number,
	name: string
}

type error = string | undefined

export interface IInitialState {
	cities: ICity[] | undefined,
	loading: boolean,
	error: error
}

export interface IAction {
	type: string,
	payload: ICity[] | {error: error}
}