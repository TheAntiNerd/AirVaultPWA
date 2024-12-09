import { Metadata } from 'next';
import Flow from './Pools';

export const metadata: Metadata = {
    title: "Airvault | Pools",
};

const page = () => {
    return (
        <Flow />
    )
}

export default page
