import React from 'react'
import NetworkFlow from './Network'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Airvault | Pools",
};

const page = () => {
    return (
        <NetworkFlow />
    )
}

export default page
