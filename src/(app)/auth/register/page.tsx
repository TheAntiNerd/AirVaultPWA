import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import RegisterPage from './Register';
import { configChecker } from '@/functions/config/init';

export default async function Register() {
	// const userSession = await getServerSession(authOptions),
	const userSession = await getServerSession(),
		user = userSession?.user;

	if (user) {
		return redirect('/dashboard');
	}

	if (configChecker.configs.mainConfig.registered === true) {
		return redirect('/auth/login');
	}

	return (
		<>
			<RegisterPage />
		</>
	);
}
