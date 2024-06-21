import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import IParams from '../types/Components/layer';

import style from '../styles/Components/layer.module.css';

const Layer: React.FC<PropsWithChildren<IParams>> = ({
	anchorRef,
	align = 'left',
	fullWidth,
	close,
	children
}) => {

	const layerRef = useRef<any>();
	
	const [layerStyle, setLayerStyle] = useState({});

	const calculatePosition = () => {
		const style: any = {}
		const marginTop = 4;
		
		const measure = {
			width: layerRef?.current?.offsetWidth || 0,
			height: layerRef?.current?.offsetHeight || 0
		}

		const bounding: any = anchorRef.current?.getBoundingClientRect()
		
		style.left = bounding.x;
		
		style.top = bounding.y + bounding.height + marginTop;

		if (align === 'right') {
			const margin = bounding.width - measure.width;
			style.left += margin
		}

		if (fullWidth) {
			style.width = bounding.width
		}

		const isLayerInView = style.top + measure.height <= window.innerHeight;

		if (!isLayerInView) {
			style.height = (window.innerHeight - (bounding.y + bounding.height + marginTop))
		}

		return style
	}

	useEffect(() => {
		setTimeout(() => setLayerStyle(calculatePosition()), 0);
		
		if (!close) return;

		const closeOutsideClick = ({ target }: MouseEvent) => !layerRef.current?.contains(target as Node) && close();

		window.addEventListener('resize', close);
		document.addEventListener('mousedown', closeOutsideClick);

		return () => {
			window.removeEventListener('resize', close)	
			document.removeEventListener('mousedown', closeOutsideClick);
		}
	}, [close, anchorRef, align, fullWidth]);

	return (
		<div ref={layerRef} className={style.layer} style={layerStyle}>
			{children}
		</div>
	)
}

export default Layer;