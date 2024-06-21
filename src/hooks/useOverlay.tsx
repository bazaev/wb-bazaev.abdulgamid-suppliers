/*

@param {Object} params
	@param {string} params.align? (left)           | alignment relative to element
	@param {string} params.verticalAlign? (top)    | vertical alignment relative to element
	@param {number} params.margin? (0)             | margin between element and overlay
	@param {number} params.verticalMargin? (0)     | vertical margin between element and overlay
	@param {boolean} params.fullWidth? (false)     | overlay width is equal to element
	@param {React.ReactNode} params.container      | element to place overlay
	@param {boolean} params.cover? (false)         | show/hide cover when overlay is shown

*/

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IParams {
	align?: 'left' | 'right'
	verticalAlign?: 'top' | 'bottom'
	margin?: number
	verticalMargin?: number
	fullWidth?: boolean
	container: React.ReactNode
	cover?: boolean
}

interface IReturn {
	isOpen: boolean
	anchorRef: React.LegacyRef<any>
	open: React.Dispatch<React.SetStateAction<boolean>>
}

const overlayRoot = document.createElement('div');
overlayRoot.setAttribute('id', 'overlay-root');

document.body.appendChild(overlayRoot);

const useOverlay = ({
	align,
	verticalAlign,
	margin = 0,
	verticalMargin = 0,
	fullWidth = false,
	container,
	cover
}: IParams): IReturn => {

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const anchorRef = useRef<HTMLElement>(null);
	const overlayRef = useRef<HTMLDivElement>(document.createElement('div'));

	const calculate = () => {
		const style: any = {
			left: 0,
			top: 0,
			width: undefined
		}
		
		const measure = {
			width: overlayRef.current.offsetWidth,
			height: overlayRef.current.offsetHeight
		}
			
		const bounding: any = anchorRef?.current?.getBoundingClientRect()

		style.left = bounding.x;
		
		style.top = bounding.y + bounding.height;

		if (align === 'right') {
			const margin = bounding.width - measure.width;
			style.left += margin
		}

		if (verticalAlign === 'bottom') {
			const margin = bounding.height + measure.height;
			style.top -= margin
		}

		style.left += margin;
		style.top += verticalMargin;

		if (fullWidth) {
			style.width = bounding.width
		}

		return style;
	}

	const updatePosition = () => {
		const style = calculate();
		Object.entries(style).forEach(([key, value]: any) => overlayRef.current.style[key] = value + 'px');
	}

	useEffect(() => {
		if (isOpen && anchorRef.current) {
			overlayRef.current.style.display = '';
			updatePosition();
		} else {
			overlayRef.current.style.display = 'none'
		}
	}, [isOpen])

	useEffect(() => {
		const close = () => setIsOpen(false);
		const remove = () => overlayRef.current?.remove();
		const closeOutsideClick = ({ target }: MouseEvent) => !overlayRef.current.contains(target as Node) && close();

		if (cover) {
			const cover = document.createElement('div');
			cover.style.cssText = `
				position: fixed;
				top: 0;
				left: 0;
				z-index: -1;
				width: 100%;
				height: 100%;
				background: #000000B2;
			`;
	
			cover.addEventListener('click', close);
			overlayRef.current.appendChild(cover);
		}

		createPortal(container, overlayRef.current);
		// overlayRef.current.appendChild = '13123123123';
		overlayRef.current.style.position = 'fixed';
		overlayRef.current.style.zIndex = '1000';
		overlayRoot?.appendChild(overlayRef.current);

		document.addEventListener('resize', close);
		document.addEventListener('mousedown', closeOutsideClick);

		return () => {
			document.removeEventListener('resize', remove);
			remove();
		}
	}, []);
	
	return {
		isOpen,
		open: setIsOpen,
		anchorRef
	}
}

export default useOverlay;