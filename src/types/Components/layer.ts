export default interface IParams {
	anchorRef: React.RefObject<HTMLElement>
	align?: 'left' | 'right'
	fullWidth?: boolean
	close?: () => void
}