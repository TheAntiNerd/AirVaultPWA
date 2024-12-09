import fs from 'fs';
import configs, { mainConfFilePath } from '../init';

// function to update the registration status of the device
export default function updateRegistration(registered: boolean = true) {
	configs.mainConfig.registered = registered;

	// update the config file
	fs.writeFileSync(mainConfFilePath, JSON.stringify(configs.mainConfig, null, '\t'));
}
