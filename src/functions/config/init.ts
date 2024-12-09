/** This function checks if the config file is generate, else it will generate the config file with default values */
import fs from 'fs';
import path from 'path';

// The default config values
const defaultConfig = {
	registered: false,
};
// update config
const updateConfig = {
	current_version: '0.0.0',
	new_version: '0.0.0',
	downloaded: false,
	installed: false,
};

const rootDir = process.cwd(),
	confDir = path.join(rootDir, 'conf'),
	mainConfFilePath = path.join(confDir, 'main.conf'),
	updateConfFilePath = path.join(confDir, 'update.conf');

class ConfigChecker {
	private configurations: { mainConfig: { [key: string]: any }; updateConfig: { [key: string]: any } } = {
		mainConfig: {},
		updateConfig: {},
	};
	constructor() {}

	get configs() {
		// read from the file(s)
		try {
			this.configurations.mainConfig = JSON.parse(fs.readFileSync(mainConfFilePath, 'utf8'));
			this.configurations.updateConfig = JSON.parse(fs.readFileSync(updateConfFilePath, 'utf8'));
		} catch (error) {
			// create the conf file with the default values
			fs.writeFileSync(mainConfFilePath, JSON.stringify(defaultConfig, null, '\t'));
			// add the default values to the main config
			this.configurations.mainConfig = defaultConfig;
			this.configurations.updateConfig = updateConfig;
		}

		return this.configurations;
	}

	set configsMain(mainConfig: { [key: string]: any }) {
		this.configurations.mainConfig = mainConfig;
		fs.writeFileSync(mainConfFilePath, JSON.stringify(mainConfig, null, '\t'));
	}
	set configsUpdate(updateConfig: { [key: string]: any }) {
		this.configurations.updateConfig = updateConfig;
		fs.writeFileSync(updateConfFilePath, JSON.stringify(updateConfig, null, '\t'));
	}
}
const configChecker = new ConfigChecker();

// const configs: { mainConfig: { [key: string]: any } } = { mainConfig: {} };

/** function to create a dir if it doesn't exist */
function createDirIfNotExists(dir: string) {
	if (!fs.existsSync(dir)) {
		try {
			fs.mkdirSync(dir);
		} catch (error) {
			console.error('Error creating conf folder:', error);
		}
	}
}

(async () => {
	// Variable that stores whether the config file exists
	let confExists = false;

	// ensure that the `conf` folder exists
	createDirIfNotExists(confDir);

	// check if the `main.conf` file exists
	if (!fs.existsSync(mainConfFilePath)) {
		// create the conf file with the default values
		fs.writeFileSync(mainConfFilePath, JSON.stringify(defaultConfig, null, '\t'));
	}

	// check if the `update.conf` file exists
	if (!fs.existsSync(updateConfFilePath)) {
		// create the conf file with the default values
		fs.writeFileSync(updateConfFilePath, JSON.stringify(updateConfig, null, '\t'));
	}
})();

export { mainConfFilePath, configChecker };
