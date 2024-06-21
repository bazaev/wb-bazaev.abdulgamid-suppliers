import ILayerParams from './layer';

export default interface IParams extends ILayerParams {
	onClick?: (key: number) => void
}

export interface IDropdown<T> extends React.FC<T> {
	Item: React.FC<React.PropsWithChildren<IItemParams>>
}

export interface IItemParams {
	onClick?: () => any
}