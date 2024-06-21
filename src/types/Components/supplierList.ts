export interface ISupplier {
	id: number,
	date: string,
	quantity: number,
	type: number,
	status: number,
	city: {
		id: number,
		name: string
	},
	warehouse: {
		id: number,
		name: string,
		address: string
	}
}

export default interface IParams {
	items: ISupplier[]
}