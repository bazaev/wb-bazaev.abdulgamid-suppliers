import * as React from 'react';

const measure = () => ({
		height: window.innerHeight,
		width: window.innerWidth,
})

const useWindowSize = () => {
	const [size, setSize] = React.useState(measure());

	React.useLayoutEffect(() => {

		const onResize = () => setSize(measure());
		
		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, []);

	return size;
}

export default useWindowSize