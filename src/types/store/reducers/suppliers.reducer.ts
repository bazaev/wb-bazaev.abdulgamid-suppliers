export interface ISupplier {
	id: number,
	date: string,
	city: number,
	warehouse: number,
	quantity: number
	type: number
	status: number
}

type error = string | undefined

export interface IInitialState {
	suppliers: ISupplier[] | undefined,
	loading: boolean,
	error: error
}

export interface IAction {
	type: string,
	payload: ISupplier[] | {error: error}
}