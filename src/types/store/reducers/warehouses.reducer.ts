export interface IWarehouse {
	id: number,
	name: string,
	address: string
}

type error = string | undefined

export interface IInitialState {
	warehouses: IWarehouse[] | undefined,
	loading: boolean,
	error: error
}

export interface IAction {
	type: string,
	payload: IWarehouse[] | {error: error}
}