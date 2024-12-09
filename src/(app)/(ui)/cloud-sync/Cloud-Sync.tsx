'use client';
import React, { useState, useEffect } from 'react';
import LinkDevices from '@/components/sync-cloud/LinkDevice';
import Credentials from '@/components/sync-cloud/Credentials';
import LinkedAccounts from '@/components/sync-cloud/LinkedAccounts';
import Details from '@/components/sync-cloud/Details';

const CloudSyncFlow = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [provider, setProvider] = useState('');


    const goToNextStep = () => {
        setStep(step + 1);
    };

    const goToPreviousStep = () => {
        setStep(step - 1);
    };

    const handleSelectMode = (Name: string, Provider: string) => {
        setName(Name);
        setProvider(Provider)
        console.log('Name saved:', Name);
        setStep(3);
    };

    const LinkedAccountsNext = () => {
        setStep(2);
    }




    return (
        <div>
            {step === 1 && <LinkDevices onNext={goToNextStep} />}
            {step === 2 && <Credentials onBack={goToPreviousStep} onNext={handleSelectMode} name={name} provider={provider} />}
            {step === 3 && (
                <LinkedAccounts onBack={goToPreviousStep} onNext={LinkedAccountsNext} onTap={goToNextStep} />
            )}
            {step === 4 && <Details onBack={goToPreviousStep} onNext={handleSelectMode} name={name} />}
        </div>
    );
};

export default CloudSyncFlow;
