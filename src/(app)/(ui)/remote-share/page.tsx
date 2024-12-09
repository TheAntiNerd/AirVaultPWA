import React from 'react'
import { Metadata } from 'next';
import RemoteShareFlow from './RemoteNetworkFlow';


export const metadata: Metadata = {
    title: "Airvault | Pools",
};

const page = () => {
    return (
        <RemoteShareFlow />
    )
}

export default page
