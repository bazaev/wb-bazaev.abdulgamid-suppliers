export default interface IParams {
	title: string;
	onClick?: (key: number) => void
	close: () => void
	active: number
}

export interface IDropdownMobile<T> extends React.FC<T> {
	Item: React.FC<React.PropsWithChildren<IItemParams>>
}

export interface IItemParams {
	active?: boolean;
	onClick?: () => void
}