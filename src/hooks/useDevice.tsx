import { useEffect, useState } from "react";

export interface IDevice {
	0: string;
	1: number;
}

interface IReturn {
    [key: string]: boolean | number;
	width: number;
}

interface IFNDevice {
    (): IReturn;
    setDevices: (device: IDevice[]) => void;
}

let deviceList: IDevice[];

const useDevice: IFNDevice = function() {
	const [device, setDevice] = useState(getDevice());

	useEffect(() => {
		const onResize = () => {
			const newDevice = getDevice();
			if (newDevice.width !== device.width) {
				setDevice(newDevice);
			}
		}

		window.addEventListener("resize", onResize);

		return () => window.removeEventListener("resize", onResize);
	}, [device]);

    return device;
};

useDevice.setDevices = function(devices) {	
	const sortedDevices = devices.sort((a, b) => a[1] - b[1]);
    deviceList = sortedDevices;
};

const getDevice = () => {
	const width = window.innerWidth;
	const device = deviceList.find((device) => device[1] > width)
				|| deviceList[deviceList.length - 1];

	return {
		[device[0]]: true,
		width: device[1]
	}
}

export default useDevice;
