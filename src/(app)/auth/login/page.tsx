import { getServerSession } from 'next-auth';
import Login from './Login';
// import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { configChecker } from '@/functions/config/init';

export default async function LoginPage() {
	// const userSession = await getServerSession(authOptions),
	const userSession = await getServerSession(),
		user = userSession?.user;

	if (user) {
		return redirect('/dashboard');
	}

	if (configChecker.configs.mainConfig.registered === false) {
		return redirect('/auth/register');
	}

	return (
		<>
			<Login />
		</>
	);
}
