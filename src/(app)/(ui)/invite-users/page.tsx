import { Metadata } from 'next';
import InviteUsers from './InviteUsers';

export const metadata: Metadata = {
    title: "Airvault | Invite-Users",
};

const page = () => {
    return (
        <InviteUsers />
    )
}

export default page
