import SetupFlow from './SetupFlow';
import { configChecker } from '../../../functions/config/init';
import { redirect } from 'next/navigation';

export default async function Setup() {
	// check if the app is not registered - redirect otherwise
	if (!!configChecker.configs.mainConfig?.registered) {
		redirect('/dashboard');
	}

	return (
		<>
			<SetupFlow />
		</>
	);
}
