import { Metadata } from 'next';
import UsersList from './UserList';

export const metadata: Metadata = {
	title: 'Airvault | Users',
};

const page = () => {
	return <UsersList />
};

export default page;
