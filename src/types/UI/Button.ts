import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

export type TColors = 'primary' | 'cloudy' | 'alpha';

export interface IParams extends ButtonHTMLAttributes<HTMLButtonElement> {
	small?: boolean
	color?: TColors
}