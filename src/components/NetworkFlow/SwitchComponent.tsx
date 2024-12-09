import React, { useEffect, useState } from 'react';
import { OnSwitch, Switch } from '../svgs';
import axios from 'axios';

interface SwitchComponentProps {
    name: string;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ name }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch the list of SMB shares and find the matching share_name
    // useEffect(() => {
    //     const listTableData = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.post('/api/smb/list');
    //             const smbShares = response.data.list;

    //             const matchingShare = smbShares.find((share: any) => share.share_name === name);
    //             console.log(matchingShare.active)

    //             if (matchingShare && matchingShare.active == 1) {
    //                 setIsSwitchOn(true);
    //             } else {
    //                 setIsSwitchOn(false);
    //             }
    //             setLoading(false);
    //         } catch (err) {
    //             console.error('Error fetching SMB shares:', err);
    //             setLoading(false);
    //         }
    //     };

    //     listTableData();
    // }, [name]); // Dependency array ensures the effect runs when the `name` changes

    const toggleSwitch = async () => {
        //     try {
        //         setLoading(true);
        //         const response = await axios.post('/api/smb/stop-share', {
        //             share_name: name,
        //         });
        //         const message = response.data.msg === 'Successfully stopped the SMB service!';
        //         if (message) {
        //             setIsSwitchOn(true)
        //         } else {
        //             setIsSwitchOn(false)
        //         }
        //         setLoading(false);
        //     } catch (err) {
        //         console.error('Error:', err);
        //         setLoading(false);
        //     }
    };

    return (
        <div
            className={`w-12 h-8 cursor-pointer ${loading ? 'opacity-50' : ''}`}
            onClick={() => setIsSwitchOn(!isSwitchOn)}
        >
            {isSwitchOn ? (
                <OnSwitch className='w-12 h-8 cursor-pointer' />
            ) : (
                <Switch className='w-12 h-8 cursor-pointer' />
            )}
        </div>
    );
};

export default SwitchComponent;
