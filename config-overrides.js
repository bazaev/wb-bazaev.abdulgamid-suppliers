const apiMocker = require("connect-api-mocker");
const { overrideDevServer } = require("customize-cra");

const devServerConfig = () => config => {
	return {
		...config,
		onBeforeSetupMiddleware: (devServer) => {
			devServer.app.use(apiMocker('/api', 'mocks/api'));
		} 
	}
}

module.exports = {
	devServer: overrideDevServer(
		devServerConfig()
	)
};